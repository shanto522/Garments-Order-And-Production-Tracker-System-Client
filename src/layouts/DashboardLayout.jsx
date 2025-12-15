import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-gray-50 text-gray-800">
      <Sidebar />

      <div className="flex-1 md:ml-64 transition-all duration-300">
        <div className="p-3 sm:p-5 md:p-8 lg:p-10 bg-white/80 backdrop-blur-md min-h-screen rounded-tl-2xl shadow-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
