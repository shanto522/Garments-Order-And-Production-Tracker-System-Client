import { Navigate } from "react-router";
import useUserInfo from "../../hooks/useUserInfo";
import LoadingSpinner from "../Shared/LoadingSpinner";

const RoleRedirect = () => {
  const [userInfo, isLoading] = useUserInfo();

  if (isLoading) return <LoadingSpinner />;
  if (!userInfo?.role) return <Navigate to="/" replace />;

  const role = userInfo.role.toLowerCase();
  const status = userInfo.status?.toLowerCase();

  if (role === "admin") return <Navigate to="/dashboard/all-orders" replace />;
  if (status !== "approved")
    return <Navigate to="/dashboard/profile" replace />;

  if (role === "customer")
    return <Navigate to="/dashboard/my-orders" replace />;
  if (role === "manager")
    return <Navigate to="/dashboard/add-product" replace />;

  return <Navigate to="/" replace />;
};

export default RoleRedirect;
