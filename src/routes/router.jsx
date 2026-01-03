import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateEvent from "../pages/CreateEvent";
import JoinedEvent from "../pages/JoinedEvent";
import ManageEvent from "../pages/ManageEvent";
import Error from "../components/Error";
import UpcomingEvent from "../pages/UpcomingEvent";
import EventDetail from "../pages/EventDetail";
import Home from "../pages/Home";
import PrivateRoute from "../privateRoute/PrivateRoute";
import About from "../pages/About";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/upcoming-events",
        element: <UpcomingEvent />,
      },
      {
        path: "/upcoming-events/:id",
        element: <EventDetail />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "create-event",
        element: (
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-event",
        element: (
          <PrivateRoute>
            <ManageEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "joined-event",
        element: (
          <PrivateRoute>
            <JoinedEvent />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
