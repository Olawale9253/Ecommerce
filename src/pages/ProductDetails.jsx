import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Minus, Plus, Star } from "lucide-react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { newArrivals, topSelling } from "../data/products";
import { addCartItem } from "../store/cartStorage";

const ProductDetails = () => {
  const { id } = useParams();
  const product = [...newArrivals, ...topSelling].find((item) => item.id === id) || newArrivals[0];
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const gallery = [product.image, ...[...newArrivals, ...topSelling].filter((item) => item.id !== product.id).slice(0, 2).map((item) => item.image)];
  const colors = ["#4a5540", "#252a35", "#b99671"];

  const addToCart = () => {
    for (let count = 0; count < quantity; count += 1) addCartItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <>
      <Banner />
      <Navbar onSearch={() => {}} />
      <main className="page-shell detail-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><a href="/#arrivals">Shop</a><span>/</span><span>{product.name}</span></nav>
        <div className="detail-layout">
          <div className="detail-gallery">
            <div className="detail-thumbnails" aria-label="Product images">
              {gallery.map((image, index) => <button className={selectedImage === image ? "is-selected" : ""} type="button" key={image} aria-label={`View product image ${index + 1}`} onClick={() => setSelectedImage(image)}><img src={image} alt="" /></button>)}
            </div>
            <div className="detail-image"><img src={selectedImage} alt={product.name} /></div>
          </div>
          <section className="detail-info" aria-labelledby="detail-title">
            <span className="eyebrow">Shop.co essentials</span>
            <h1 id="detail-title">{product.name}</h1>
            <div className="detail-rating"><span className="rating">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill={index < Math.round(product.rating) ? "currentColor" : "none"} />)}</span><span>{product.rating}/5 <span className="muted">· 142 reviews</span></span></div>
            <div className="detail-price"><strong>${product.price}</strong>{product.oldPrice && <><span className="old-price">${product.oldPrice}</span><span className="discount">-{Math.round((1 - product.price / product.oldPrice) * 100)}%</span></>}</div>
            <p className="detail-description">A considered everyday piece made for comfort and easy styling. Designed with a relaxed feel, thoughtful details, and a fit that works from weekday to weekend.</p>
            <div className="detail-option"><h2>Choose a color</h2><div className="color-options">{colors.map((color, index) => <button type="button" key={color} className={selectedColor === index ? "is-selected" : ""} style={{ "--swatch": color }} aria-label={`Select color ${index + 1}`} aria-pressed={selectedColor === index} onClick={() => setSelectedColor(index)} />)}</div></div>
            <div className="detail-option"><h2>Choose a size</h2><div className="size-options">{["Small", "Medium", "Large", "X-Large"].map((size) => <button type="button" key={size} className={selectedSize === size ? "is-selected" : ""} aria-pressed={selectedSize === size} onClick={() => setSelectedSize(size)}>{size}</button>)}</div></div>
            <div className="detail-actions"><div className="quantity-control"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15} /></button><span>{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}><Plus size={15} /></button></div><button className="button-primary" type="button" onClick={addToCart}>{added ? "Added to bag" : "Add to bag"}</button></div>
            <p className="delivery-note">Free delivery on orders over $150. <a href="/#shop">Keep exploring <ArrowLeft size={13} /></a></p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;
