// src/components/Shared/Navbar.jsx
import React from "react";
import { Link, NavLink } from "react-router";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import logoImg from "../../../assets/logoImg.jpg";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, signOutFunc } = useAuth();

  const handleLogOut = () => {
    signOutFunc();
  };

  const publicLinks = (
    <>
      <li>
        <NavLink className="font-semibold" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="font-semibold" to="/all-products">
          All-Products
        </NavLink>
      </li>
      <li>
        <NavLink className="font-semibold" to="/about-us">
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

  const privateLinks = (
    <>
      <li>
        <NavLink className="font-semibold" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="font-semibold" to="/all-products">
          All-Products
        </NavLink>
      </li>
      <li>
        <NavLink className="font-semibold" to="/dashboard">
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar dark:bg-gray-900 dark:text-gray-200 px-4">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Small screen dropdown */}
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
            className="menu menu-compact dark:bg-gray-900 dark:text-gray-200 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {user ? privateLinks : publicLinks}

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
        <img
          className="h-[50px] w-[50px] rounded-full ml-2"
          src={logoImg}
          alt="Logo"
        />
      </div>

      {/* Navbar Center (large screen) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {user ? privateLinks : publicLinks}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-1 rounded-lg transition-all"
            >
              <img
                src={
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${
                    user.displayName || "User"
                  }`
                }
                alt="profile"
                className="h-9 w-9 rounded-full border-2 border-white"
              />
              <FaRegArrowAltCircleDown />
            </div>

            <ul className="dropdown-content menu bg-base-100 rounded-xl mt-3 w-60 dark:bg-gray-900 dark:text-gray-200 p-3 shadow-lg border border-gray-200 dark:border-gray-700">
              <li className="text-center pb-2 border-b border-gray-300 dark:border-gray-600">
                <div className="flex flex-col items-center">
                  <img
                    src={
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${
                        user.displayName || "User"
                      }`
                    }
                    alt="profile"
                    className="h-14 w-14 rounded-full border-2 border-gray-400 mb-2"
                  />
                  <p className="font-semibold text-[20px]">
                    {user.displayName}
                  </p>
                  <p className="text-xs font-semibold">{user.email}</p>
                </div>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="text-red-600 font-semibold flex justify-center rounded-lg transition-colors w-full items-center gap-2 mt-2"
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
