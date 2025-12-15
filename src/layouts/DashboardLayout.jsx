import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Sidebar from "../components/Dashboard/Sidebar";

const DashboardLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Role-based default redirect
      if (user.role === "customer") navigate("/dashboard/my-orders");
      else if (user.role === "manager") navigate("/dashboard/add-product");
      else if (user.role === "admin") navigate("/dashboard/all-orders");
    }
  }, [user, navigate]);

  return (
    <div className="relative min-h-screen  md:flex bg-gray-50 text-gray-800">
      {/* Left Side: Sidebar Component */}
      <Sidebar />

      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1 md:ml-64 transition-all duration-300">
        <div
          className="p-3 sm:p-5 md:p-8 lg:p-10 
          bg-white/80 backdrop-blur-md min-h-screen 
          rounded-tl-2xl shadow-inner"
        >
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
