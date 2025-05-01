import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSellerAuth } from '../context/SellerAuthContext';
import SellerLayout from '../components/SellerLayout';

const OptionCard = ({ title, description, icon, link }) => (
  <Link
    to={link}
    className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-gray-200"
  >
    <div className="text-gray-800 mb-4 text-3xl">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </Link>
);

const SellerHomePage = () => {
  const { seller, loading } = useSellerAuth();

  useEffect(() => {
    if (seller && seller.sellerId) {
      console.log('Current seller in HomePage:', seller);
    }
  }, [seller]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-black">Loading...</div>
      </div>
    );
  }

  if (!seller) {
    return null;
  }

  const isBusiness = seller.sellerType === 'business';
  const listingLimit = isBusiness ? 'Unlimited' : '1';
  const remainingListings = isBusiness ? 'Unlimited' : Math.max(0, 1 - 0); // Modify logic as needed

  // Dummy analytics (replace with API data as needed)
  const totalListings = 12;
  const pendingOrders = 3;
  const completedOrders = 9;
  const totalEarnings = 15400;

  return (
    <SellerLayout>
      <div className="min-h-[calc(100vh-4rem)] w-full p-6 bg-gray-50 text-black">
        <div className="grid gap-6">

          {/* Welcome Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Welcome, {seller.name}!</h1>
            <p className="text-gray-700">Manage your seller account and listings here.</p>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h4 className="text-sm text-gray-500">Total Listings</h4>
              <p className="text-2xl font-bold text-gray-800 mt-1">{totalListings}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h4 className="text-sm text-gray-500">Pending Orders</h4>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{pendingOrders}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h4 className="text-sm text-gray-500">Completed Orders</h4>
              <p className="text-2xl font-bold text-green-600 mt-1">{completedOrders}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h4 className="text-sm text-gray-500">Total Earnings</h4>
              <p className="text-2xl font-bold text-blue-600 mt-1">₹{totalEarnings.toLocaleString()}</p>
            </div>
          </div>

          {/* Main Grid: Account Info + Quick Actions */}
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Account Status */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Account Status</h2>
                <div className="space-y-2">
                  <p className="text-gray-600">Account Type: <span className="font-semibold text-gray-800">{isBusiness ? 'Business' : 'Individual'}</span></p>
                  <p className="text-gray-600">Listing Limit: <span className="font-semibold text-gray-800">{listingLimit}</span></p>
                  <p className="text-gray-600">Remaining Listings: <span className="font-semibold text-gray-800">{remainingListings}</span></p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="grid gap-6">
                <OptionCard
                  title="List a Phone"
                  description="Add a new phone to your inventory"
                  icon="📱"
                  link="/seller/SellerDashboard"
                />
                {!isBusiness && (
                  <OptionCard
                    title="Register as Business"
                    description="Upgrade to a business account"
                    icon="🏢"
                    link="/seller/BusinessRegister"
                  />
                )}
                <OptionCard
                title="Selling Guidelines"
                description="Learn how to list responsibly and check device IMEI"
                icon="📘"
                link="/seller/guidelines"/>
              </div>
            </div>

          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerHomePage;
