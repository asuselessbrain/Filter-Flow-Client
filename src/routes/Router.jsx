import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/signUp/SignUp";

const router = createBrowserRouter([
    {
      path: "/",
      element: <SignUp />
    },
  ]);

  export default router;