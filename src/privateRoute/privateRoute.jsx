import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router";
import Loading from "../components/Loading";
import { useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading)
    return (
      <div className="w-full min-h-screen bg-background flex justify-center items-center">
        <Loading />
      </div>
    );

  if (user) return children;

  return <Navigate to="/auth/login" state={location.pathname} />;
};

export default PrivateRoute;