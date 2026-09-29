import { createBrowserRouter } from "react-router";
import BrandsPage from "../pages/BrandsPage";
import Cart from "../pages/Cart";
import CatalogPage from "../pages/CatalogPage";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/shop",
    element: <CatalogPage />,
  },
  {
    path: "/on-sale",
    element: <CatalogPage />,
  },
  {
    path: "/new-arrivals",
    element: <CatalogPage />,
  },
  {
    path: "/brands",
    element: <BrandsPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
]);

export default router;
