import { useState } from "react";
import { Link } from "react-router";
import logoImg from "../../assets/logoImg.jpg";
// Icons
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";

// User Menu
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import ManagerMenu from "./Menu/ManagerMenu";
import CustomerMenu from "./Menu/CustomerMenu";
import { House } from "lucide-react";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../../pages/Shared/LoadingSpinner";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const [role, isRoleLoading] = useRole();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("overflow-hidden");
  };
  if (isRoleLoading) return <LoadingSpinner />;
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-white/90 border-b border-blue-100 shadow-sm backdrop-blur-md text-slate-700 flex justify-between md:hidden px-4 py-3 sticky top-0 z-30">
        <div className="cursor-pointer font-bold tracking-wide">
          <Link to="/">
            <img
              src={logoImg}
              className="h-[50px] w-[50px] rounded-full ml-4"
              alt=""
            />
          </Link>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button rounded-md p-2 hover:bg-blue-100 active:scale-95 transition"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-30 fixed inset-y-0 left-0 w-60 sm:w-64 md:w-64 lg:w-72 bg-white/90 shadow-2xl backdrop-blur-xl border-r border-blue-100 transform
    ${isActive ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 transition-all duration-300 ease-in-out rounded-r-2xl flex flex-col`}
      >
        {/* Scrollable Middle */}
        <nav className="flex-1 overflow-y-auto px-5 py-3 space-y-2">
          <Link
            to="/"
            className="w-full font-semibold p-4 rounded-2xl shadow-lg 
        bg-gradient-to-br from-[#f5f7fa] to-[#dfe9f3]
        flex items-center justify-center gap-3"
          >
            <House className="w-5 h-5" />
            <span>Home</span>
          </Link>
          {role === "customer" && <CustomerMenu />}
          {role === "manager" && <ManagerMenu />}
          {role === "admin" && <AdminMenu />}
        </nav>

        {/* Bottom fixed */}
        <div className="flex-shrink-0 px-5 py-3 border-t border-blue-100">
          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
