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
        path: "/create-event",
        element: (
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "/joined-event",
        element: (
          <PrivateRoute>
            <JoinedEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-event",
        element: (
          <PrivateRoute>
            <ManageEvent />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;