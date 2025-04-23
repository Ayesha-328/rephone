import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
    { name: "Category", path: "/category" }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#002647] to-[#003566] shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-white hover:text-[#FF9F1C] transition-colors">
              Rephone
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-lg font-medium ${
                    location.pathname === item.path
                      ? "text-[#FF9F1C] border-b-2 border-[#FF9F1C]"
                      : "text-white hover:text-[#FF9F1C] hover:border-b-2 hover:border-[#FF9F1C]"
                  } transition-all duration-200 py-2`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#FF9F1C] focus:border-transparent"
              />
              <button className="absolute right-3 text-white/70 hover:text-[#FF9F1C]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-6">
              <Link
                to="/seller/login"
                className="text-white hover:text-[#FF9F1C] transition-colors font-medium"
              >
                Sell a Phone
              </Link>
              <div className="flex items-center space-x-4">
                
                <Link to="/cart" className="text-white hover:text-[#FF9F1C] transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-[#FF9F1C] transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={handleMenuClick}
                  className={`text-lg ${
                    location.pathname === item.path
                      ? "text-[#FF9F1C]"
                      : "text-white hover:text-[#FF9F1C]"
                  } transition-colors`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10">
                <Link
                  to="/seller/login"
                  className="block text-white hover:text-[#FF9F1C] transition-colors"
                >
                  Sell a Phone
                </Link>
                <div className="flex items-center space-x-4 mt-4">
                  <Link
                    to="/register"
                    className="bg-[#FF9F1C] text-white px-4 py-2 rounded-full hover:bg-[#f39200] transition-colors"
                  >
                    Start a Business
                  </Link>
                  <Link
                    to="/cart"
                    className="text-white hover:text-[#FF9F1C] transition-colors"
                  >
                    Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
};
