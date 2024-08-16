import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/signUp/SignUp";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export default router;
