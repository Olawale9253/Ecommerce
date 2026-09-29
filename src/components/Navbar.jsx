import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ChevronDown, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { getCartItems, subscribeToCart } from "../store/cartStorage";

const Navbar = ({ onSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const search = new URLSearchParams(location.search).get("search") ?? "";
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [cartCount, setCartCount] = useState(() => getCartItems().reduce((count, item) => count + item.quantity, 0));

  useEffect(() => subscribeToCart(() => {
    setCartCount(getCartItems().reduce((count, item) => count + item.quantity, 0));
  }), []);

  useEffect(() => {
    const closeMenus = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setShopOpen(false);
      }
    };

    document.addEventListener("keydown", closeMenus);
    return () => document.removeEventListener("keydown", closeMenus);
  }, []);

  const closeMenus = () => {
    setMenuOpen(false);
    setShopOpen(false);
  };

  const updateSearch = (value) => {
    const params = new URLSearchParams(location.search);
    if (value.trim()) params.set("search", value);
    else params.delete("search");
    navigate({
      pathname: location.pathname,
      search: params.toString() ? `?${params}` : "",
      hash: location.hash,
    }, { replace: true });
    onSearch?.(value);
  };

  const submitSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    onSearch?.(search.trim());
    navigate({ pathname: "/", search: params.toString() ? `?${params}` : "", hash: "#shop" });
    closeMenus();
  };

  return (
    <header className="site-header">
      <div className="page-shell nav-inner">
        <button className="icon-button mobile-menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <Link className="brand-mark" to="/" aria-label="Shop.co home">
          <img src="/shopCo.svg" alt="SHOP.CO" />
        </Link>
        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <div className="nav-shop">
            <button className="nav-shop-trigger" type="button" aria-expanded={shopOpen} aria-controls="shop-menu" onClick={() => setShopOpen(!shopOpen)}>
              Shop <ChevronDown size={15} aria-hidden="true" />
            </button>
            {shopOpen && (
              <div className="shop-menu" id="shop-menu">
                <Link to="/shop" onClick={closeMenus}>Shop all</Link>
                <Link to="/on-sale" onClick={closeMenus}>On sale</Link>
                <Link to="/new-arrivals" onClick={closeMenus}>New arrivals</Link>
              </div>
            )}
          </div>
          <Link to="/on-sale" onClick={closeMenus}>On Sale</Link>
          <Link to="/new-arrivals" onClick={closeMenus}>New Arrivals</Link>
          <Link to="/brands" onClick={closeMenus}>Brands</Link>
        </nav>
        <form className="nav-search" role="search" onSubmit={submitSearch}>
          <button className="nav-search-submit" type="submit" aria-label="Search products"><Search size={19} aria-hidden="true" /></button>
          <input aria-label="Search products" placeholder="Search for products..." value={search} onChange={(event) => updateSearch(event.target.value)} />
        </form>
        <div className="nav-actions">
          <Link className="icon-button" to="/cart" aria-label={`Shopping bag, ${cartCount} items`}>
            <ShoppingBag size={21} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          <Link className="icon-button account-button" to="/profile" aria-label="Your profile"><UserRound size={20} /></Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
