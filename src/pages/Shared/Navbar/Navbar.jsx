// src/components/Shared/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import logoImage from "../../../assets/logoImage.png";

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
    <div className="navbar dark:bg-gray-800 dark:text-gray-200 md:px-8">
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
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-gray-800 rounded-box w-52"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/all-products">All-Products</NavLink>
            </li>

            {canViewDashboard() && (
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            )}

            {!user && (
              <>
                <li>
                  <NavLink to="/auth/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/auth/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/">
          <img
            className="h-[50px] w-[50px] rounded-full"
            src={logoImage}
            alt="Logo"
          />
        </Link>
      </div>

      {/* Navbar Center (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/all-products">All-Products</NavLink>
          </li>

          {canViewDashboard() && (
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          )}

          {!user && (
            <>
              <li>
                <NavLink to="/about-us">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-2">
        {!isLoading && userInfo && user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-1 rounded-lg"
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

            <ul className="dropdown-content menu bg-base-100 dark:bg-gray-800 rounded-xl mt-3 w-60 p-3 shadow-lg">
              <li className="text-center pb-2 border-b">
                <div className="flex flex-col items-center">
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
              </li>

              <li>
                <button
                  onClick={handleLogOut}
                  className="text-red-600 font-semibold flex justify-center items-center gap-2 mt-2"
                >
                  <IoMdLogOut size={22} />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/auth/login" className="btn btn-sm btn-outline">
              Login
            </NavLink>
            <NavLink to="/auth/register" className="btn btn-sm btn-primary">
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
