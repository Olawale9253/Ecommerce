import { Check, Plus, Star } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { addCartItem } from "../../store/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    dispatch(addCartItem(product));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link className="product-photo-link" to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
          <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
        </Link>
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button className="quick-add" type="button" onClick={addToCart} aria-label={`Add ${product.name} to bag`} title="Add to bag">
          {added ? <Check size={18} /> : <Plus size={19} />}
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name"><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <div className="rating" aria-label={`${product.rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, index) => <Star key={index} size={13} fill={index < Math.round(product.rating) ? "currentColor" : "none"} />)}
          <span>{product.rating}/5</span>
        </div>
        <div className="product-price">
          <span>${product.price}</span>
          {product.oldPrice && <><span className="old-price">${product.oldPrice}</span><span className="discount">-{Math.round((1 - product.price / product.oldPrice) * 100)}%</span></>}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
