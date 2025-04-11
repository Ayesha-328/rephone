
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SellerDashboard } from "../client/sellers/pages/SellerDasboard";
// import { SellerForm } from "../client/sellers/components/sellerForm";
export const Header = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);


  const handleActiveItem = (item) => {
    setActiveItem(item);
    // setActivePage(item); // Update the active page in the parent component
    setMenuOpen(false); // Close the menu on selection
    setSearchOpen(false);
  };
  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }} // Moves navbar 100px up and makes it invisible
        animate={{ y: 0, opacity: 1 }} // Brings it down to its original position
        transition={{ duration: 1, ease: "easeOut" }} // Controls speed and smoothness 
        className="text-white w-full flex ml-2 fixed left-0 justify-between items-center top-6 lg:top-10">
        <button
          onClick={() => setMenuOpen(!isMenuOpen)}
          className="md:hidden items-center justify-center bg-transparent w-18 h-16 mt-0"
        >
          <img className="h-10 w-10" src="/menu.png" alt="Menu" />
        </button>

        {/* Container for the header content */}
        <div className="max-w-[40%] min-h-[50px] bg-[#003566] container mx-auto justify-center items-center p-2 rounded-tl-2xl rounded-bl-2xl drop-shadow-[6px_-6px_3px_rgba(244,244,244,0.4),-6px_6px_4px_rgba(255,159,28,0.6)] hidden md:flex">

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-3 gap-6 font-[Merriweather] text-xl font-bold cursor-pointer">
            {["home", "About Us", "Services", "Catagory"].map((item) => (
              <li
                key={item}
                className={`p-2 border-b-4 ${activeItem === item
                  ? "border-[#FF9F1C]"
                  : "border-transparent"
                  } hover:border-[#000C1C] transition-all`}
                onClick={() => handleActiveItem(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
            ))}
          </ul>


          {/* Hamburger Icon for Mobile */}

        </div>

        {/* Second Div: Input Box + Icons */}
        <div className="max-w-[40%] min-h-[50px] flex-1 flex justify-end items-center space-x-8 bg-[#003566] px-6 ml-42 mr-10 rounded-tr-2xl rounded-br-2xl drop-shadow-[-6px_6px_4px_rgba(255,159,28,0.6),6px_-6px_3px_rgba(244,244,244,0.4)] hidden md:flex">

          {/* Input Box */}

          {/* Seller? Sign-In, Cart Links */}
          <ul className="hidden md:flex items-center space-x-8 font-[Merriweather] text-xl font-bold text-[#FFFFFF]">
            <li className="relative ">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 pr-12 bg-[#FF9F1C] font-bold text-xl w-60 rounded-tr-2xl rounded-br-2xl text-[#FFFFFF] focus:outline-none"
              />
              <img
                src="/magnifying-glass.png"
                className="w-10 h-10 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer border-l-4 border-[#003566]"
                alt="Search"
              />
            </li>


            <li className="cursor-pointer text-white hover:text-gray-300 transition mt-1 ml-2 font-[Merriweather] font-bold text-xl">
              <Link
                to="/SellerDashboard">
                Seller?
              </Link>
            </li>



            <li className="bg-[#FF9F1C] w-40 h-16 flex justify-center items-center rounded-tr-2xl rounded-br-2xl gap-6 -mr-7">
              <Link to="/SellerDashboard">
                <img src="/entrance.png" className="w-10 h-10 cursor-pointer" alt="Entrance" />
              </Link>
              <img src="/bag.png" className="w-10 h-10 cursor-pointer" />
            </li>
          </ul>
        </div>













        {/* 
      {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#003566] p-4 absolute top-18 w-65 z-40 rounded-2xl">
            <ul className="flex flex-col space-y-3 font-[Merriweather] text-xl">
              {["home", "About Us", "Services", "Catagory"].map((item) => (
                <li
                  key={item}
                  className={`p-2 border-b-4 ${activeItem === item
                    ? "border-[#FF9F1C]"
                    : "border-transparent"
                    } hover:border-[#000C1C] transition-all`}
                  onClick={() => handleActiveItem(item)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </li>
              ))}
            </ul>

          </div>


        )}
        {/* Always Visible Mobile Search Bar */}
        <div className="md:hidden bg-[#003566] p-4 absolute top-1 left-30 w-55 h-14 z-40 rounded-2xl flex">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-20 px-2 py-1 bg-[#FF9F1C] font-bold text-sm rounded-lg text-[#FFFFFF] focus:outline-none"
            />
            <img
              src="/magnifying-glass.png"
              className="w-5 h-5 absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer"
              alt="Search"
            />
          </div>
          <p className="cursor-pointer hover:text-gray-300 transition mt-1 ml-2 font-[Merriweather] font-bold text-sm">
            Seller?
          </p>
          <div className="bg-[#FF9F1C] w-15 h-14 flex justify-center items-center rounded-tr-2xl rounded-br-2xl  gap-2 -mt-4 ml-3 -mr-8">
            <img src="/entrance.png" className="w-6 h-6 cursor-pointer" />
            <img src="/bag.png" className="w-6 h-6 cursor-pointer" />
          </div>
        </div>

      </motion.nav>

    </>
  );
};
