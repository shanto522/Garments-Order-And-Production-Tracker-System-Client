import { Navigate } from "react-router";
import LoadingSpinner from "../pages/Shared/LoadingSpinner";
import useUserInfo from "../hooks/useUserInfo";

const ManagerRoute = ({ children }) => {
   const [userInfo, isLoading] = useUserInfo();

  if (isLoading) return <LoadingSpinner />;
  if (
    userInfo?.role === "manager" &&
    userInfo?.status === "approved"
  ) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default ManagerRoute;
