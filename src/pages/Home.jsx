import { useSearchParams } from "react-router";
import Banner from "../components/Banner";
import Brands from "../components/Brands";
import Footer from "../components/Footer";
import Hero from "../components/home/Hero";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import ProductList from "../components/products/ProductList";
import { newArrivals, topSelling } from "../data/products";
import Testimonials from "../components/Testimonials";

const Home = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") ?? "";

  return (
    <>
      <Banner />
      <Navbar />
      <Hero />
      <Brands />
      <main id="shop">
        <ProductList id="arrivals" title="New arrivals" products={newArrivals} query={query} />
        <div className="page-shell collection-divider" />
        <ProductList id="top-selling" title="Top selling" products={topSelling} query={query} />
        <section className="style-section page-shell" aria-labelledby="style-heading">
          <div className="style-panel">
            <h2 className="section-heading" id="style-heading">Browse by dress style</h2>
            <div className="style-grid">
              <a className="style-tile" href="#arrivals"><img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85" alt="A refined casual outfit" loading="lazy" /><h3>Casual</h3></a>
              <a className="style-tile" href="#top-selling"><img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85" alt="Modern formal menswear" loading="lazy" /><h3>Formal</h3></a>
              <a className="style-tile" href="#arrivals"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85" alt="Streetwear styling" loading="lazy" /><h3>Party</h3></a>
              <a className="style-tile" href="#top-selling"><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=85" alt="Relaxed activewear" loading="lazy" /><h3>Gym</h3></a>
            </div>
          </div>
        </section>
      </main>
      <Testimonials />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Home;
