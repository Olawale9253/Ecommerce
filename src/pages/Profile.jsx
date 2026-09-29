import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Check, UserRound } from "lucide-react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getCartItems } from "../store/cartStorage";

const PROFILE_KEY = "shopco-profile";

const readProfile = () => {
  try {
    return JSON.parse(window.localStorage.getItem(PROFILE_KEY) || "null") ?? { name: "", email: "" };
  } catch {
    return { name: "", email: "" };
  }
};

const Profile = () => {
  const [profile, setProfile] = useState(readProfile);
  const [saved, setSaved] = useState(false);
  const cartCount = getCartItems().reduce((total, item) => total + item.quantity, 0);

  const updateField = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
    setSaved(false);
  };

  const saveProfile = (event) => {
    event.preventDefault();
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    setSaved(true);
  };

  return (
    <>
      <Banner />
      <Navbar />
      <main className="page-shell profile-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Profile</span></nav>
        <header className="profile-heading">
          <span className="eyebrow">Your account</span>
          <h1 className="section-heading">Profile</h1>
        </header>
        <div className="profile-layout">
          <section className="profile-card" aria-labelledby="profile-details-title">
            <div className="profile-card-heading">
              <span className="profile-avatar"><UserRound size={22} /></span>
              <div><h2 id="profile-details-title">Personal details</h2><p>Saved privately on this device</p></div>
            </div>
            <form className="profile-form" onSubmit={saveProfile}>
              <label>Full name<input name="name" autoComplete="name" value={profile.name} onChange={updateField} placeholder="Your name" /></label>
              <label>Email address<input name="email" type="email" autoComplete="email" value={profile.email} onChange={updateField} placeholder="you@example.com" /></label>
              <button className="button-primary" type="submit">{saved ? <><Check size={16} /> Saved</> : "Save profile"}</button>
              <p className="profile-status" role="status">{saved ? "Your profile has been saved on this device." : ""}</p>
            </form>
          </section>
          <aside className="profile-card profile-overview">
            <span className="eyebrow">Quick view</span>
            <h2>Your shopping</h2>
            <p><span>Items in your bag</span><strong>{cartCount}</strong></p>
            <Link to="/cart">View your bag <ArrowRight size={16} /></Link>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;