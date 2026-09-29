import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const requestAuth = async (path, options = {}) => {
  const response = await fetch(`/api/auth/${path}`, {
    credentials: "include",
    ...options,
  });

  if (response.status === 204) return {};
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Authentication failed. Please try again.");
  return data;
};

const postAuth = (path, credentials) =>
  requestAuth(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

export const loadCurrentUser = createAsyncThunk("auth/loadCurrentUser", async () => {
  try {
    const data = await requestAuth("me");
    return data.user;
  } catch {
    return null;
  }
});

export const signupUser = createAsyncThunk("auth/signup", async (credentials, { rejectWithValue }) => {
  try {
    return (await postAuth("signup", credentials)).user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    return (await postAuth("login", credentials)).user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await postAuth("logout", {});
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadCurrentUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.status = "ready";
      })
      .addCase(loadCurrentUser.rejected, (state) => {
        state.user = null;
        state.status = "ready";
      })
      .addCase(signupUser.pending, (state) => {
        state.status = "submitting";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.status = "ready";
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        state.status = "ready";
        state.error = payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "submitting";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.status = "ready";
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.status = "ready";
        state.error = payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "ready";
      });
  },
});

export default authSlice.reducer;