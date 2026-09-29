import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router";
import { loadCurrentUser } from "./store/authSlice";
import router from "./routes/router";

const App = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dispatch]);

  if (authStatus === "idle" || authStatus === "loading") {
    return <div className="auth-session-loading" role="status">Loading your shop...</div>;
  }

  return <RouterProvider router={router} />;
};

export default App;
