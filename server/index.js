import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { Buffer } from "node:buffer";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import process from "node:process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import express from "express";
import { database } from "./database.js";

const app = express();
const scrypt = promisify(scryptCallback);
const clientDirectory = resolve(fileURLToPath(new URL("../dist/", import.meta.url)));
const cookieName = "shopco_session";
const sessionLifetime = 7 * 24 * 60 * 60 * 1000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.disable("x-powered-by");
app.use(express.json({ limit: "12kb" }));

const publicUser = (user) => ({
  id: String(user.id),
  name: user.name,
  email: user.email,
});

const hashToken = (token) => createHash("sha256").update(token).digest("hex");

const hashPassword = async (password, salt) =>
  (await scrypt(password, salt, 64)).toString("hex");

const readSessionToken = (request) => {
  const sessionCookie = (request.headers.cookie ?? "")
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${cookieName}=`));

  return sessionCookie?.slice(cookieName.length + 1) || null;
};

const setSessionCookie = (response, token) => {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.setHeader(
    "Set-Cookie",
    `${cookieName}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${sessionLifetime / 1000}${secure}`,
  );
};

const clearSessionCookie = (response) => {
  response.setHeader("Set-Cookie", `${cookieName}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
};

const createSession = (userId, response) => {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = Date.now() + sessionLifetime;

  database.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(Date.now());
  database.prepare("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)")
    .run(hashToken(token), userId, expiresAt);
  setSessionCookie(response, token);
};

const getSessionUser = (request) => {
  const token = readSessionToken(request);
  if (!token) return null;

  const session = database.prepare(`
    SELECT users.id, users.name, users.email, sessions.expires_at
    FROM sessions
    JOIN users ON users.id = sessions.user_id
    WHERE sessions.token_hash = ?
  `).get(hashToken(token));

  if (!session) return null;
  if (session.expires_at <= Date.now()) {
    database.prepare("DELETE FROM sessions WHERE token_hash = ?").run(hashToken(token));
    return null;
  }

  return session;
};

const validPassword = (password) =>
  typeof password === "string" && password.length >= 8 && Buffer.byteLength(password, "utf8") <= 128;

app.post("/api/auth/signup", async (request, response) => {
  const name = typeof request.body?.name === "string" ? request.body.name.trim() : "";
  const email = typeof request.body?.email === "string" ? request.body.email.trim().toLowerCase() : "";
  const password = request.body?.password;

  if (!name || name.length > 100) {
    return response.status(400).json({ error: "Enter a name between 1 and 100 characters." });
  }
  if (email.length > 254 || !emailPattern.test(email)) {
    return response.status(400).json({ error: "Enter a valid email address." });
  }
  if (!validPassword(password)) {
    return response.status(400).json({ error: "Choose a password between 8 and 128 bytes." });
  }

  if (database.prepare("SELECT id FROM users WHERE email = ?").get(email)) {
    return response.status(409).json({ error: "An account with this email already exists." });
  }

  try {
    const salt = randomBytes(16).toString("hex");
    const passwordHash = await hashPassword(password, salt);
    const result = database.prepare(`
      INSERT INTO users (name, email, password_hash, password_salt, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, email, passwordHash, salt, Date.now());

    createSession(result.lastInsertRowid, response);
    const user = database.prepare("SELECT id, name, email FROM users WHERE id = ?").get(result.lastInsertRowid);
    return response.status(201).json({ user: publicUser(user) });
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed")) {
      return response.status(409).json({ error: "An account with this email already exists." });
    }
    console.error("Signup failed:", error);
    return response.status(500).json({ error: "Could not create your account. Please try again." });
  }
});

app.post("/api/auth/login", async (request, response) => {
  const email = typeof request.body?.email === "string" ? request.body.email.trim().toLowerCase() : "";
  const password = request.body?.password;

  if (!emailPattern.test(email) || typeof password !== "string" || !password) {
    return response.status(400).json({ error: "Enter a valid email address and password." });
  }

  const user = database.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user) {
    await hashPassword(password, "shopco-login-timing-salt");
    return response.status(401).json({ error: "Email or password is incorrect." });
  }

  const submittedHash = Buffer.from(await hashPassword(password, user.password_salt), "hex");
  const storedHash = Buffer.from(user.password_hash, "hex");
  if (submittedHash.length !== storedHash.length || !timingSafeEqual(submittedHash, storedHash)) {
    return response.status(401).json({ error: "Email or password is incorrect." });
  }

  createSession(user.id, response);
  return response.json({ user: publicUser(user) });
});

app.get("/api/auth/me", (request, response) => {
  const user = getSessionUser(request);
  if (!user) return response.status(401).json({ error: "Sign in to continue." });
  return response.json({ user: publicUser(user) });
});

app.post("/api/auth/logout", (request, response) => {
  const token = readSessionToken(request);
  if (token) database.prepare("DELETE FROM sessions WHERE token_hash = ?").run(hashToken(token));
  clearSessionCookie(response);
  return response.status(204).end();
});

app.use("/api", (_request, response) => response.status(404).json({ error: "API route not found." }));

const clientIndex = join(clientDirectory, "index.html");

if (existsSync(clientIndex)) {
  app.use(express.static(clientDirectory));
  app.use((request, response, next) => {
    if (request.method !== "GET" || request.path.startsWith("/api/")) return next();
    return response.sendFile(clientIndex);
  });
}

const port = Number(process.env.PORT) || 3001;
app.listen(port, () => console.log(`Shop.co API listening on http://localhost:${port}`));