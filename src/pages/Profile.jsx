import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { ArrowRight, Check, UserRound } from "lucide-react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { saveProfile as saveProfileAction } from "../store/profileSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const savedProfile = useSelector((state) => state.profile);
  const cartCount = useSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0));
  const [profile, setProfile] = useState(savedProfile);
  const [saved, setSaved] = useState(false);

  const updateField = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
    setSaved(false);
  };

  const saveProfile = (event) => {
    event.preventDefault();
    dispatch(saveProfileAction(profile));
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
              <div><h2 id="profile-details-title">Personal details</h2></div>
            </div>
            <form className="profile-form" onSubmit={saveProfile}>
              <label>Full name<input name="name" autoComplete="name" value={profile.name} onChange={updateField} placeholder="Your name" /></label>
              <label>Email address<input name="email" type="email" autoComplete="email" value={profile.email} onChange={updateField} placeholder="you@example.com" /></label>
              <button className="button-primary" type="submit">{saved ? <><Check size={16} /> Saved</> : "Save profile"}</button>
              <p className="profile-status" role="status">{saved ? "Your profile has been saved." : ""}</p>
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