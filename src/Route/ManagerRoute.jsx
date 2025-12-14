import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../pages/Shared/LoadingSpinner";

const ManagerRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner />;
  if (role === "manager") return children;
  return <Navigate to="/" replace="true" />;
};

export default ManagerRoute;
