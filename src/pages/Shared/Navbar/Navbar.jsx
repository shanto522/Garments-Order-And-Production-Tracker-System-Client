import React from "react";
import { NavLink } from "react-router";

import logoImg from "../../../assets/logoImg.jpg";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, signOutFunc } = useAuth();

  // Links for all users
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-products">All-Products</NavLink>
      </li>
      <li>
        <NavLink to="/about-us">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
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
            {user && (
              <>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <button onClick={signOutFunc} className="btn btn-sm w-full">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
        <NavLink to="/">
          <img
            className="h-[50px] w-[50px] rounded-full"
            src={logoImg}
            alt="Logo"
          />
        </NavLink>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end space-x-2 hidden lg:flex">
        {!user ? (
          <>
            <NavLink to="/auth/login" className="btn btn-sm">
              Login
            </NavLink>
            <NavLink to="/auth/register" className="btn btn-sm btn-primary">
              Register
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/dashboard" className="btn btn-sm">
              Dashboard
            </NavLink>
            <img
              src={
                user.photoURL ||
                `https://ui-avatars.com/api/?name=${user.displayName || "User"}`
              }
              alt="avatar"
              className="w-9 h-9 rounded-full"
            />
            <button onClick={signOutFunc} className="btn btn-sm btn-error">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
