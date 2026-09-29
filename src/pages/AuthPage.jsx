import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { loginUser, signupUser } from "../store/authSlice";

const AuthPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSignup = pathname === "/signup";
  const isSubmitting = useSelector((state) => state.auth.status === "submitting");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (isSignup && formData.get("password") !== formData.get("confirmPassword")) {
      setMessage("Your passwords do not match.");
      return;
    }

    setMessage("");
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
      ...(isSignup ? { name: formData.get("name") } : {}),
    };

    try {
      await dispatch(isSignup ? signupUser(credentials) : loginUser(credentials)).unwrap();
      navigate("/profile", { replace: true });
    } catch (error) {
      setMessage(typeof error === "string" ? error : "Could not connect to the account service. Try again.");
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-visual" aria-label="Shop.co collection">
        <div className="auth-visual-copy">
          <span className="auth-visual-kicker">THE SHOP.CO EDIT</span>
          <h1>Make room for your next favorite.</h1>
          <p>Thoughtful essentials. Better everyday.</p>
        </div>
      </section>
      <section className="auth-panel">
        <Link className="auth-brand" to="/" aria-label="Shop.co home">
          <img src="/shopCo.svg" alt="SHOP.CO" />
        </Link>
        <div className="auth-content">
          <span className="eyebrow">YOUR SHOP.CO ACCOUNT</span>
          <h2>{isSignup ? "Create your account" : "Welcome back"}</h2>
          <p className="auth-intro">
            {isSignup ? "Join us for a more personal shopping experience." : "Sign in to pick up right where you left off."}
          </p>
          <form className="auth-form" onSubmit={handleSubmit}>
            {isSignup ? (
              <label className="auth-field">
                Full name
                <input name="name" type="text" autoComplete="name" placeholder="Your name" required />
              </label>
            ) : null}
            <label className="auth-field">
              Email address
              <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            </label>
            <label className="auth-field">
              Password
              <span className="auth-password-wrap">
                <input name="password" type={showPassword ? "text" : "password"} autoComplete={isSignup ? "new-password" : "current-password"} minLength={8} placeholder="At least 8 characters" required />
                <button className="auth-password-toggle" type="button" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword((visible) => !visible)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>
            {isSignup ? (
              <label className="auth-field">
                Confirm password
                <input name="confirmPassword" type={showPassword ? "text" : "password"} autoComplete="new-password" minLength={8} placeholder="Re-enter your password" required />
              </label>
            ) : null}
            <button className="button-primary auth-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Please wait..." : isSignup ? "Create account" : "Sign in"}</button>
            <p className="auth-message" role="status" aria-live="polite">{message}</p>
          </form>
          <p className="auth-switch">
            {isSignup ? "Already have an account?" : "New to Shop.co?"}{" "}
            <Link to={isSignup ? "/login" : "/signup"}>{isSignup ? "Sign in" : "Create an account"}</Link>
          </p>
        </div>
        <Link className="auth-back-link" to="/"><ArrowLeft size={15} /> Back to shopping</Link>
      </section>
    </main>
  );
};

export default AuthPage;