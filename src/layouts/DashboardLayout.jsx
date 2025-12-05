// src/layout/DashboardLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import Navbar from "../pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  const { user, role } = useAuth(); // role = "admin" | "manager" | "buyer"

  // Sidebar links based on role
  const adminLinks = (
    <>
      <li>
        <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/all-products">All Products</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/all-orders">All Orders</NavLink>
      </li>
    </>
  );

  const managerLinks = (
    <>
      <li>
        <NavLink to="/dashboard/add-product">Add Product</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-products">Manage Products</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/pending-orders">Pending Orders</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/approved-orders">Approved Orders</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile">My Profile</NavLink>
      </li>
    </>
  );

  const buyerLinks = (
    <>
      <li>
        <NavLink to="/dashboard/my-orders">My Orders</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/track-order">Track Order</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile">My Profile</NavLink>
      </li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      {/* Sidebar */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <Navbar></Navbar>

        {/* Main content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Drawer Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 bg-base-200 text-base-content">
          <li className="mb-4 font-bold text-lg">
            {user?.displayName || "User"}
          </li>

          {role === "admin" && adminLinks}
          {role === "manager" && managerLinks}
          {role === "buyer" && buyerLinks}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
