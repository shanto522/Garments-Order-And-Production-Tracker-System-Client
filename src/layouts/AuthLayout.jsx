import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <div>
     <nav className="sticky top-0 z-50">
       <Navbar></Navbar>
     </nav>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default AuthLayout;
