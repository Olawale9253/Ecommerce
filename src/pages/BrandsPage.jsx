import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const brands = [
  { name: "Versace", logo: "/versace-logo.svg", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85", website: "https://www.versace.com/" },
  { name: "Zara", logo: "/zara-logo.svg", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85", website: "https://www.zara.com/" },
  { name: "Gucci", logo: "/gucci-logo.svg", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85", website: "https://www.gucci.com/" },
  { name: "Prada", logo: "/prada-logo.svg", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85", website: "https://www.prada.com/" },
  { name: "Calvin Klein", logo: "/calvin-klein-logo.svg", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85", website: "https://www.calvinklein.us/" },
];

const BrandsPage = () => (
  <>
    <Banner />
    <Navbar />
    <main className="brands-page">
      <div className="page-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>/</span><span>Brands</span>
        </nav>
        <header className="brands-heading">
          <span className="eyebrow">Names to know</span>
          <h1 className="section-heading">Featured brands</h1>
          <p>Explore the labels behind some of our favorite looks.</p>
        </header>
        <section className="brand-directory" aria-label="Featured brands">
          {brands.map((brand) => (
            <a className="brand-directory-item" href={brand.website} key={brand.name} target="_blank" rel="noreferrer">
              <span className="brand-directory-photo"><img src={brand.image} alt={`Fashion editorial for ${brand.name}`} loading="lazy" /></span>
              <span className="brand-directory-details">
                <span className="brand-directory-logo"><img src={brand.logo} alt={brand.name} loading="lazy" /></span>
                <span className="brand-directory-label">Visit site<ArrowUpRight size={17} aria-hidden="true" /></span>
              </span>
            </a>
          ))}
        </section>
        <section className="brand-shop-cta" aria-label="Shop the collection">
          <p>Find something that feels like you.</p>
          <Link className="button-primary" to="/shop">Shop all products <ArrowUpRight size={16} /></Link>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default BrandsPage;