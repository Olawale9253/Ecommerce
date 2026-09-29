import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { removeCartItem, updateCartItemQuantity } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const delivery = subtotal === 0 || subtotal >= 150 ? 0 : 12;

  return (
    <>
      <Banner />
      <Navbar onSearch={() => {}} />
      <main className="page-shell cart-page">
        <span className="eyebrow">Your selection</span>
        <h1 className="section-heading">Your bag</h1>
        {items.length ? (
          <div className="cart-layout">
            <section className="cart-items" aria-label="Items in your bag">
              {items.map((item) => (
                <article className="cart-row" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>${item.price} each</p>
                    <div className="cart-row-bottom">
                      <div className="cart-quantity-control" aria-label={`Quantity for ${item.name}`}>
                        <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch(updateCartItemQuantity({ productId: item.id, quantity: item.quantity - 1 }))}><Minus size={14} /></button>
                        <span>{item.quantity}</span>
                        <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(updateCartItemQuantity({ productId: item.id, quantity: item.quantity + 1 }))}><Plus size={14} /></button>
                      </div>
                      <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                  </div>
                  <div className="cart-row-end"><button className="remove-item" type="button" aria-label={`Remove ${item.name}`} onClick={() => dispatch(removeCartItem(item.id))}><Trash2 size={18} /></button></div>
                </article>
              ))}
            </section>
            <aside className="cart-summary">
              <h2>Order summary</h2>
              <div className="summary-line"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
              <div className="summary-line"><span>Delivery</span><strong>{delivery === 0 ? "Free" : `$${delivery.toFixed(2)}`}</strong></div>
              <div className="summary-line total"><span>Total</span><strong>${(subtotal + delivery).toFixed(2)}</strong></div>
              <button className="button-primary" type="button" onClick={() => window.alert("Checkout is coming soon.")}>Continue to checkout</button>
            </aside>
          </div>
        ) : (
          <div className="cart-empty"><p>Your bag is waiting for a little style.</p><Link className="button-primary" to="/"><ArrowLeft size={16} /> Continue shopping</Link></div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Cart;
