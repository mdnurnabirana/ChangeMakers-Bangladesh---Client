import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../privateRoute/privateRoute";
import CreateEvent from "../pages/createEvent";
import JoinedEvent from "../pages/JoinedEvent";
import ManageEvent from "../pages/ManageEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      }
    ],
  },
  {
    path: "/create-event",
    element: (<PrivateRoute>
      <CreateEvent></CreateEvent>
    </PrivateRoute>)
  }, 
  {
    path: "/joined-event",
    element: (<PrivateRoute>
      <JoinedEvent></JoinedEvent>
    </PrivateRoute>)
  },
  {
    path: "/manage-event",
    element: (<PrivateRoute>
      <ManageEvent></ManageEvent>
    </PrivateRoute>)
  }
]);

export default router;