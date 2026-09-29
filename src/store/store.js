import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { fakeStoreApi } from "../api/fakeStoreApi";
import cartReducer from "./cartSlice";
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
    cart: cartReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fakeStoreApi.middleware),
});

setupListeners(store.dispatch);
