import { createBrowserRouter } from "react-router";
import Navbar from "../components/Navbar";
import HomeLayout from "../layouts/HomeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  }
]);

export default router;