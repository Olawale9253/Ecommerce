import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const paymentMethods = ["/Visa.svg", "/mastercard.svg", "/paypal.svg", "/applePay.svg", "/googlePay.svg"];
const footerGroups = [
  { title: "Company", links: ["About", "Features", "Works", "Careers"] },
  { title: "Help", links: ["Customer support", "Delivery details", "Terms & conditions", "Privacy policy"] },
  { title: "FAQ", links: ["Account", "Manage deliveries", "Orders", "Payments"] },
  { title: "Resources", links: ["Free e-books", "Development tutorial", "How to - Blog", "Youtube playlist"] },
];

const Footer = () => (
  <footer className="site-footer">
    <div className="page-shell">
      <div className="footer-top">
        <div className="footer-about">
          <Link className="brand-mark" to="/" aria-label="Shop.co home"><img src="/shopCo.svg" alt="SHOP.CO" /></Link>
          <p>We have clothes that suit your style and that you’re proud to wear. From everyday essentials to pieces that make a statement.</p>
          <div className="social-links" aria-label="Social media">
            <a href="#social" aria-label="X"><FaXTwitter size={13} /></a>
            <a href="#social" aria-label="Facebook"><FaFacebookF size={13} /></a>
            <a href="#social" aria-label="Instagram"><FaInstagram size={13} /></a>
          </div>
        </div>
        {footerGroups.map((group) => (
          <nav className="footer-column" key={group.title} aria-label={group.title}>
            <h3>{group.title}</h3>
            <ul>{group.links.map((label) => <li key={label}><a href="#footer">{label}</a></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="footer-bottom">
        <span>Shop.co © 2026, All Rights Reserved</span>
        <div className="payment-methods" aria-label="Accepted payment methods">
          {paymentMethods.map((path) => <img key={path} src={path} alt={path.split("/").pop().replace(".svg", "")} />)}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;