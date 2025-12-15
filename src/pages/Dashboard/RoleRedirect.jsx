import { Navigate } from "react-router";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../Shared/LoadingSpinner";

const RoleRedirect = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  if (role === "customer") return <Navigate to="my-orders" replace />;
  if (role === "manager") return <Navigate to="add-product" replace />;
  if (role === "admin") return <Navigate to="all-orders" replace />;

  return null;
};

export default RoleRedirect;
