import { useState } from "react";
import { Link } from "react-router";
import { AiOutlineBars } from "react-icons/ai";
import { FcSettings } from "react-icons/fc";
import { House } from "lucide-react";

import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import ManagerMenu from "./Menu/ManagerMenu";
import CustomerMenu from "./Menu/CustomerMenu";

import LoadingSpinner from "../../pages/Shared/LoadingSpinner";
import useUserInfo from "../../hooks/useUserInfo";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const [userInfo, isLoading, isError] = useUserInfo();

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("overflow-hidden");
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error loading user info</p>;

  return (
    <>
      {/* Mobile toggle */}
      <div className="backdrop-blur-md text-slate-700 flex justify-end md:hidden px-4 py-3">
        <button
          onClick={handleToggle}
          className="rounded-md p-2 hover:bg-blue-100 active:scale-95 transition"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:sticky top-16 left-0 w-60 sm:w-64 md:w-64 lg:w-72 
        bg-white/90 shadow-2xl backdrop-blur-xl border-r border-blue-100
        transform ${isActive ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-all duration-300 ease-in-out 
        rounded-r-2xl flex flex-col z-30 h-[calc(100vh-4rem)]`}
      >
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

          {userInfo?.role === "admin" && <AdminMenu />}

          {userInfo?.role === "manager" && userInfo?.status === "approved" && (
            <ManagerMenu />
          )}

          {userInfo?.role === "customer" && userInfo?.status === "approved" && (
            <CustomerMenu />
          )}
        </nav>

        {/* Profile */}
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
