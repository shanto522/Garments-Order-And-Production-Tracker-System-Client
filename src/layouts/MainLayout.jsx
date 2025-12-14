import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar with shadow & sticky */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-md">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-16 py-6 bg-gray-50">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-200 mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
