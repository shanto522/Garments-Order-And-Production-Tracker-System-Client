import React from "react";

import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../pages/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (user && user?.email) {
    return children;
  }
  return (
    <Navigate to="/auth/login" state={{ from: location }} replace></Navigate>
  );
};

export default PrivateRoute;
