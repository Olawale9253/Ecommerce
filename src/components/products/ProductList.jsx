import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import ProductCard from "./ProductCard";

const ProductList = ({ title, products, query, id }) => {
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <section className="product-section page-shell" id={id}>
      <div className="section-top">
        <h2 className="section-heading">{title}</h2>
        <Link className="text-link" to={id === "arrivals" ? "/new-arrivals" : "/shop"}>View all <ArrowRight size={15} /></Link>
      </div>
      <div className="product-grid">
        {filteredProducts.length ? filteredProducts.map((product) => <ProductCard key={product.id} product={product} />) : <p className="empty-results">No products match “{query}”. Try another search.</p>}
      </div>
    </section>
  );
};

export default ProductList;
