import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../../components/Footer';

const FeatureCard = ({ title, description, icon, link }) => (
  <Link
    to={link}
    className="bg-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
  >
    <div className="text-[#FF9F1C] mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </Link>
);

const SellerHomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('sellerToken');
    navigate('/seller/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-[#003566] text-white p-8 pt-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-2">Seller Dashboard</h1>
              <p className="text-xl text-gray-300">
                Manage your phone listings and business on Rephone
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 text-black px-6 py-2 rounded-full transition duration-300"
            >
              Logout
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="List a Phone"
              description="Add a new phone listing with detailed information and photos"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
              link="/seller/SellerDashboard"
            />

            <FeatureCard
              title="Register Business"
              description="Upgrade to a business account for more features and benefits"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
              link="/register"
            />
          </div>

          <div className="mt-12 bg-white/10 p-8 rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Quick Tips</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#FF9F1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Take clear photos of your phones in good lighting
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#FF9F1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Provide accurate descriptions including any defects
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#FF9F1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Set competitive prices based on phone condition
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#FF9F1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Respond quickly to buyer inquiries
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerHomePage; 