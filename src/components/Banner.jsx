import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router";

const Banner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="announcement" role="region" aria-label="Promotion">
      <p>Free shipping on orders over $150. <Link to="/shop">Shop the collection</Link></p>
      <button type="button" aria-label="Dismiss announcement" onClick={() => setVisible(false)}>
        <X size={14} />
      </button>
    </div>
  );
};

export default Banner;
