import { Navigate } from "react-router";
import LoadingSpinner from "../pages/Shared/LoadingSpinner";
import useUserInfo from "../hooks/useUserInfo";

const AdminRoute = ({ children }) => {
  const [userInfo, isLoading] = useUserInfo();

  if (isLoading) return <LoadingSpinner />;
  if (userInfo?.role === "admin") {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default AdminRoute;
