const CART_KEY = "shopco-cart";
const CART_EVENT = "shopco-cart-updated";

export const getCartItems = () => {
  try {
    return JSON.parse(window.localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveCartItems = (items) => {
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
};

export const addCartItem = (product) => {
  const items = getCartItems();
  const existingItem = items.find((item) => item.id === product.id);

  if (existingItem) existingItem.quantity += 1;
  else items.push({ ...product, quantity: 1 });

  saveCartItems(items);
};

export const removeCartItem = (productId) => {
  saveCartItems(getCartItems().filter((item) => item.id !== productId));
};

export const updateCartItemQuantity = (productId, quantity) => {
  const items = getCartItems();
  const item = items.find((cartItem) => cartItem.id === productId);
  if (!item) return;

  item.quantity = Math.max(1, quantity);
  saveCartItems(items);
};

export const subscribeToCart = (callback) => {
  window.addEventListener(CART_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CART_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};