// src/components/Shared/Footer.jsx
import React from "react";
import { Link, NavLink } from "react-router";
import logoImg from "../../../assets/logoImage.png";
import facebookImg from '../../../assets/facebook.png'
import twitterImg from '../../../assets/twitter.png'
import instagramImg from '../../../assets/instagram.png'
import youtubeImg from '../../../assets/youtube.png'
const Footer = () => {
  return (
    <footer className="bg-gray-100  text-gray-700  border border-gray-300">
      <div className="max-w-7xl mx-auto px-5 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo + Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={logoImg}
            alt="Logo"
            className="h-16 w-16 mb-3 rounded-full"
          />
          <h2 className="font-bold text-xl">Garments Tracker</h2>
          <p className="text-sm mt-1">
            Efficiently manage orders, production, and delivery.
          </p>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="font-semibold text-lg mb-3">Useful Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/" className="hover:text-blue-600 transition">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-products"
                className="hover:text-blue-600 transition"
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about-us"
                className="hover:text-blue-600 transition"
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-blue-600 transition">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Account Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="font-semibold  text-lg mb-3">Follow Us</h4>
          <ul className=" flex flex-row gap-4 mt-5 text-sm">
            <li>
              <Link to='https://web.facebook.com/shahriar.nafij.2002'>
                <img src={facebookImg} className="h-8 w-8" alt="" />
              </Link>
            </li>
            <li>
              <Link to='https://www.instagram.com/shahriarnafij/'>
               <img src={instagramImg} className="h-8 w-8" alt="" />  
              </Link>
            </li>
            <li>
              <Link to='https://x.com/Nafij522'>
                <img src={twitterImg} className="h-8 w-8" alt="" /> 
              </Link>
            </li>
            <li>
              <Link>
                <img src={youtubeImg} className="h-8 w-8" alt="" /> 
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="font-semibold text-lg mb-3">Contact</h4>
          <p className="text-sm">Email: shahriarnafij000@gmail.com</p>
          <p className="text-sm mt-1">Phone: +880 1794967522</p>
          <p className="text-sm mt-1">Address: 123, Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-6 py-4 text-center text-sm sm:text-base">
        © {new Date().getFullYear()} Garments Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
