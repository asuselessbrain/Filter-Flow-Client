import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/signUp/SignUp";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
