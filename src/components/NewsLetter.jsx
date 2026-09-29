import { useState } from "react";
import { Mail } from "lucide-react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const subscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setMessage("You're on the list. Watch your inbox for something good.");
    setEmail("");
  };

  return (
    <section className="newsletter-wrap page-shell" aria-labelledby="newsletter-title">
      <div className="newsletter">
        <h2 id="newsletter-title">Stay up to date about our latest offers</h2>
        <form className="newsletter-form" onSubmit={subscribe}>
          <label className="newsletter-input">
            <Mail size={18} aria-hidden="true" />
            <input type="email" required placeholder="Enter your email address" aria-label="Email address" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <button type="submit">Subscribe to newsletter</button>
          <p className="newsletter-message" role="status">{message}</p>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
