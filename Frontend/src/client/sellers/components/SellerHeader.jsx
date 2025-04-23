import React from 'react';
import { Link } from 'react-router-dom';

const SellerHeader = ({ sellerName, profilePicture }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/seller/home" className="flex items-center">
              <span className="text-2xl font-bold text-[#003566]">Rephone</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/seller/home" className="text-gray-700 hover:text-[#003566]">
              Dashboard
            </Link>
            <Link to="/seller/form" className="text-gray-700 hover:text-[#003566]">
              List a Phone
            </Link>
          </nav>

          {/* Profile section */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{sellerName}</span>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#003566]">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt={`${sellerName}'s profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xl">
                    {sellerName?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SellerHeader; 