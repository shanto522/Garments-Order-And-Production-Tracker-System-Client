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

const Sidebar = () => {
  const [isActive, setActive] = useState(false);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("overflow-hidden");
  };

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
        className={`z-30 md:fixed flex flex-col justify-between overflow-y-auto overflow-x-hidden 
        bg-white/90 shadow-2xl backdrop-blur-xl 
        w-60 sm:w-64 md:w-64 lg:w-72 space-y-6 px-5 py-6 absolute 
        inset-y-0 left-0 transform border-r border-blue-100
        ${isActive ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0  
        transition-all duration-300 ease-in-out rounded-r-2xl`}
      >
        <div className="flex flex-col h-full">
          {/* Middle Content */}
          <div className="flex flex-col justify-between flex-1 mt-3 space-y-2 md:space-y-3">
            <nav className="space-y-2 md:space-y-3 lg:space-y-4">
              {/* Role-Based Menus */}
              <CustomerMenu />
              <ManagerMenu />
              <AdminMenu />
            </nav>
          </div>

          {/* Bottom Area */}
          <div className="pb-3">
            <hr className="mb-4 border-blue-200" />

            <MenuItem
              icon={FcSettings}
              label="Profile"
              address="/dashboard/profile"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
