import React from 'react';
import { FaFacebookF, FaInstagram, FaVk } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 text-sm font-[Poppins]">
      {/* Top Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 lg:px-12 py-6 border-b gap-4 text-center sm:text-left">
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <span className="text-green-500 text-3xl font-bold">D</span>
          <span className="text-green-500 font-bold text-lg">ily.ru</span>
        </div>

        {/* Location */}
        <div className="text-xs text-gray-500">Moscow</div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <span className="font-medium hidden sm:inline">Join us</span>
          <div className="flex gap-3">
            <FaFacebookF className="text-green-500 hover:text-green-700 cursor-pointer" />
            <FaInstagram className="text-green-500 hover:text-green-700 cursor-pointer" />
            <FaVk className="text-green-500 hover:text-green-700 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Link Sections */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-12 py-10">
        <div>
          <h3 className="font-bold mb-3">Navigation</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Ads</li>
            <li>Stores</li>
            <li>Charity</li>
            <li>My Account</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Service Center</h3>
          <ul className="space-y-2 text-gray-600">
            <li>What we repair</li>
            <li>Service center locations</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Online Store</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Product catalog</li>
            <li>Delivery & Payment</li>
            <li>Cart</li>
            <li>My Account</li>
            <li>Contacts</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">For Users</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Guarantees</li>
            <li>Delivery & Payment</li>
            <li>Support</li>
            <li>FAQ</li>
          </ul>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 lg:px-12 py-4 border-t text-xs text-gray-500 text-center sm:text-left gap-2">
        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
          <span>Privacy Policy</span>
          <span>User Agreement</span>
          <span>Cookie Usage</span>
          <span>Site Map</span>
        </div>
        <div className="text-center sm:text-right">
          Dily.ru &copy; 2021
        </div>
      </div>
    </footer>
  );
};

export default Footer;
