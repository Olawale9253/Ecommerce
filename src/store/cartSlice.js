import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addCartItem(state, { payload: product }) {
      const existingItem = state.items.find((item) => item.id === product.id);
      const quantity = product.quantity ?? 1;

      if (existingItem) existingItem.quantity += quantity;
      else state.items.push({ ...product, quantity });
    },
    removeCartItem(state, { payload: productId }) {
      state.items = state.items.filter((item) => item.id !== productId);
    },
    updateCartItemQuantity(state, { payload: { productId, quantity } }) {
      const item = state.items.find((cartItem) => cartItem.id === productId);
      if (item) item.quantity = Math.max(1, quantity);
    },
  },
});

export const { addCartItem, removeCartItem, updateCartItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;