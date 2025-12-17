import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const DashboardLayout = () => {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar></Navbar>
      </div>
      <div className="relative min-h-screen md:flex bg-gray-50 text-gray-800">
        <Sidebar />

        <div className="flex-1 transition-all duration-300">
          <div className="p-3 sm:p-5 md:p-8 lg:p-10 bg-white/80 backdrop-blur-md rounded-tl-2xl shadow-inner">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default DashboardLayout;
