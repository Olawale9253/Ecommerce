import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ title, products, query, id }) => {
  const [showAll, setShowAll] = useState(false);
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(query.trim().toLowerCase()));
  const visibleProducts = showAll ? filteredProducts : filteredProducts.slice(0, 4);

  return (
    <section className="product-section page-shell" id={id}>
      <div className="section-top">
        <h2 className="section-heading">{title}</h2>
      </div>
      <div className="product-grid">
        {filteredProducts.length ? visibleProducts.map((product) => <ProductCard key={product.id} product={product} />) : <p className="empty-results">No products match “{query}”. Try another search.</p>}
      </div>
      {filteredProducts.length > 4 ? (
        <button className="view-all-button" type="button" aria-expanded={showAll} onClick={() => setShowAll((current) => !current)}>
          {showAll ? "Show less" : "View all"}
          {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      ) : null}
    </section>
  );
};

export default ProductList;
