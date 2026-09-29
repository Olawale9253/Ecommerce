import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <div className="hero-copy">
          <span className="eyebrow">Everyday style, redefined</span>
          <h1 id="hero-title">Find clothes that match your style</h1>
          <p>Browse through our diverse range of carefully crafted garments, designed to bring out your individuality and sense of style.</p>
          <a className="button-primary" href="#arrivals">Shop Now <ArrowRight size={17} /></a>
          <div className="hero-stats" aria-label="Shop.co at a glance">
            <div className="hero-stat"><strong>200+</strong><span>International brands</span></div>
            <div className="hero-stat"><strong>2,000+</strong><span>Quality products</span></div>
            <div className="hero-stat"><strong>30,000+</strong><span>Happy customers</span></div>
          </div>
        </div>
      </div>
      <img className="hero-spark hero-spark-large" src="/big-star.svg" alt="" aria-hidden="true" />
      <img className="hero-spark hero-spark-small" src="/small-star.svg" alt="" aria-hidden="true" />
    </section>
  );
};

export default Hero;
