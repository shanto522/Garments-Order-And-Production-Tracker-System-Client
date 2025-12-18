import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../pages/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useUserInfo from "../hooks/useUserInfo";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [userInfo, isProfileLoading] = useUserInfo();

  if (loading || isProfileLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
