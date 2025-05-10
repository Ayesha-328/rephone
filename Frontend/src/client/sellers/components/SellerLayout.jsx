import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSellerAuth } from '../context/SellerAuthContext';

const SellerLayout = ({ children }) => {
  const { seller, logout } = useSellerAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate('/seller/login');
  };

  const isBusiness = seller?.sellerType === 'business';

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-[#f8f9fa] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#003366] border-b border-white/10 z-50 " >
        <div className="flex justify-between items-center h-16 px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-black hover:text-[#FF9F1C] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/seller/home">
              <span className='text-3xl font-bold text-white'>Rephone Seller</span>
            </Link>   
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white">Welcome, {seller?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-[#ff0000] hover:bg-[#ff5252] text-black font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen pt-16">
        {/* Sidebar */}
        <aside 
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-[#003366] border-r border-white/10 w-64 transform transition-transform duration-300 ease-in-out z-40 flex flex-col ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="p-4 space-y-6 flex-1">
         
            <div className="space-y-1">
            <Link
                to="/seller/home"
                className="flex items-center gap-3 px-4 py-3 text-[#ffffff] hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-medium text-white">Home</span>
              </Link>
              
              <Link
                to="/seller/SellerDashboard"
                className="flex items-center gap-3 px-4 py-3 text-[#ffffff] hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="font-medium text-white">List a product</span>
              </Link>
              <Link
                to="/seller/products"
                className="flex items-center gap-3 px-4 py-3 text-[#ffffff] hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="font-medium text-white">Listed Products</span>
              </Link>
              <Link
                to="/seller/orders"
                className="flex items-center gap-3 px-4 py-3 text-[#ffffff] hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="font-medium text-white">Orders</span>
              </Link>
              <Link
  to="/seller/guidelines"
  className="flex items-center gap-3 px-4 py-3 text-[#ffffff] hover:bg-white/10 rounded-lg transition-colors"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a2 2 0 100-4H7a2 2 0 100 4zm10 8H5a2 2 0 01-2-2V6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2z" />
  </svg>
  <span className="font-medium text-white">Selling Guidelines</span>
</Link>

              <Link
                to="/seller/SellerProfilePage"
                className="flex items-center gap-3 px-4 py-3 text-[#ffffff] hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium text-white">Profile</span>
              </Link>
            </div>
          </nav>
          {!isBusiness && (
            <div className="p-4 border-t border-white/10">
              <Link
                to="/seller/BusinessRegister"
                className="flex items-center justify-center gap-2 bg-[#FF9F1C] hover:bg-[#f39200] text-black font-semibold py-3 px-4 rounded-lg transition-colors w-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Upgrade to Business
              </Link>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main 
          className={`flex-1 min-h-[calc(100vh-4rem)]  ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;