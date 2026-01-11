import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import {
  FaBoxOpen,
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaRegArrowAltCircleDown,
  FaSignInAlt,
  FaTachometerAlt,
  FaUserPlus,
} from "react-icons/fa";
import logoImage from "../../../assets/logoImage.png";
import homeIcon from "../../../assets/house.png";
import boxIcon from "../../../assets/box.png";
import aboutIcon from "../../../assets/information (1).png";
import contactIcon from "../../../assets/telephone.png";
import loginIcon from "../../../assets/login.png";
import registerIcon from "../../../assets/register.png";
import dashboardIcon from "../../../assets/dashboard.png";
import logoutIcon from "../../../assets/log-out.png";
import useAuth from "../../../hooks/useAuth";
import useUserInfo from "../../../hooks/useUserInfo";

const Navbar = () => {
  const { user, signOutFunc } = useAuth();
  const [userInfo, isLoading] = useUserInfo();

  const handleLogOut = () => {
    signOutFunc();
  };
  const canViewDashboard = () => {
    if (!user || !userInfo) return false;

    const role = userInfo.role?.toLowerCase();
    if (role === "admin") return true;
    if (role === "manager" || role === "customer") return true;

    return false;
  };

  return (
    <div className="navbar   md:px-8 border-b border-gray-300 bg-white">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100  rounded-box w-52"
          >
            <li>
              <NavLink className="font-semibold" to="/">
                <img src={homeIcon} className="h-4 w-4" alt="" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink className="font-semibold" to="/all-products">
                <img className="h-5 w-5" src={boxIcon} alt="" />
                All-Products
              </NavLink>
            </li>
            <li>
              <NavLink className="font-semibold" to="/about-us">
                <img src={aboutIcon} className="h-5 w-5" alt="" />
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink className="font-semibold" to="/contact">
                <img src={contactIcon} className="h-5 w-5" alt="" />
                Contact
              </NavLink>
            </li>

            {canViewDashboard() && (
              <li>
                <NavLink to="/dashboard">
                  <img src={dashboardIcon} className="h-5 w-5" alt="" />
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/">
          <img
            className="h-[50px] w-[50px] border border-gray-400 rounded-full"
            src={logoImage}
            alt="Logo"
          />
        </Link>
      </div>

      {/* Navbar Center (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink className=" font-semibold" to="/">
              <img src={homeIcon} className="h-5 w-5" alt="" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink className="font-semibold" to="/all-products">
              <img className="h-5 w-5" src={boxIcon} alt="" />
              All-Products
            </NavLink>
          </li>

          {canViewDashboard() && (
            <li>
              <NavLink className="font-semibold" to="/dashboard">
                <img src={dashboardIcon} className="h-5 w-5" alt="" />
                Dashboard
              </NavLink>
            </li>
          )}

          <li>
            <NavLink className="font-semibold" to="/about-us">
              <img src={aboutIcon} className="h-5 w-5" alt="" />
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink className="font-semibold" to="/contact">
              <img src={contactIcon} className="h-5 w-5" alt="" />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-2">
        {!isLoading && userInfo && user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 px-3 py-1 rounded-lg"
            >
              <img
                src={
                  user.photoURL ||
                  userInfo.photoURL ||
                  `https://ui-avatars.com/api/?name=${
                    user.displayName || userInfo.name || "User"
                  }`
                }
                alt="profile"
                className="h-10 w-10 rounded-full border-2 border-white"
              />
              <FaRegArrowAltCircleDown />
            </div>

            <ul className="dropdown-content menu bg-base-100 rounded-xl mt-3 w-60 p-3 shadow-lg">
             <Link to='/dashboard/profile'> <li className="text-center pb-2 border-b">
                
                  <div className="flex flex-col items-center">
                    {" "}
                    <img
                      src={
                        user.photoURL ||
                        userInfo.photoURL ||
                        `https://ui-avatars.com/api/?name=${
                          user.displayName || userInfo.name || "User"
                        }`
                      }
                      alt="profile"
                      className="h-14 w-14 rounded-full border-2 border-white"
                    />
                    <p className="font-semibold text-[18px]">
                      {user.displayName || userInfo.name || "User"}
                    </p>
                    <p className="text-xs">{user.email}</p>
                  </div>
              
              </li></Link>

              <li>
                <button
                  onClick={handleLogOut}
                  className="text-red-600 font-semibold flex justify-center items-center gap-2 mt-2"
                >
                  <img className="h-8 w-8" src={logoutIcon} alt="" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/auth/login" className="btn btn-sm btn-outline">
              <img src={loginIcon} className="h-5 w-5" alt="" />
              Login
            </NavLink>
            <NavLink to="/auth/register" className="btn btn-sm btn-outline">
              <img src={registerIcon} className="h-5 w-5" alt="" />
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
