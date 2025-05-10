import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSellerAuth } from '../context/SellerAuthContext';
import SellerLayout from '../components/SellerLayout';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { FiSmartphone, FiDollarSign, FiCheckCircle, FiClock, FiTrendingUp, FiPieChart , FiArrowUpCircle } from 'react-icons/fi';
import { FaBusinessTime } from 'react-icons/fa';
import { MdOutlineSell, MdOutlineBusiness } from 'react-icons/md';
import { RiGuideLine } from 'react-icons/ri';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const OptionCard = ({ title, description, icon, link }) => (
  <Link
    to={link}
    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100 hover:bg-blue-50 group"
  >
    <div className="text-blue-600 mb-4 text-3xl group-hover:text-blue-700 transition-colors">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-gray-900">{title}</h3>
    <p className="text-gray-600 text-sm group-hover:text-gray-700">{description}</p>
  </Link>
);

const MetricCard = ({ title, value, icon, trend, trendValue, className }) => (
  <div className={`bg-white p-5 rounded-xl shadow-sm border border-gray-100 ${className}`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>
    </div>
    {trend && (
      <div className={`mt-3 text-sm flex items-center ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {trend === 'up' ? (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
        {trendValue}
      </div>
    )}
  </div>
);
const SellerHomePage = () => {
  const { seller, loading } = useSellerAuth();
  const [metrics, setMetrics] = useState({
    totalListings: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalEarnings: 0,
    salesData: []
  });
  const [statusCounts, setStatusCounts] = useState([]);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (seller && seller.sellerId) {
        try {
          setIsLoadingMetrics(true);
          setError(null);
          
          // Fetch metrics
          const metricsRes = await fetch(`http://localhost:5000/api/seller/metrics/${seller.sellerId}`, {
            credentials: 'include' 
          });
          
          if (!metricsRes.ok) {
            throw new Error(`Metrics fetch failed: ${metricsRes.status}`);
          }
          
          const metricsData = await metricsRes.json();
          setMetrics({
            totalListings: Number(metricsData.totalListings) || 0,
            pendingOrders: Number(metricsData.pendingOrders) || 0,
            completedOrders: Number(metricsData.completedOrders) || 0,
            totalEarnings: Number(metricsData.totalEarnings) || 0,
            salesData: Array.isArray(metricsData.salesData) ? metricsData.salesData : []
          });
          
          // Fetch status counts
          const statusRes = await fetch(`http://localhost:5000/api/seller/listing-status/${seller.sellerId}`, {
            credentials: 'include' // Important for cookies
          });
          
          if (!statusRes.ok) {
            throw new Error(`Status counts fetch failed: ${statusRes.status}`);
          }
          
          const statusData = await statusRes.json();
          setStatusCounts(Array.isArray(statusData) ? statusData : []);
          
        } catch (error) {
          console.error('Error fetching metrics:', error);
          setError(error.message);
        } finally {
          setIsLoadingMetrics(false);
        }
      }
    };

    fetchMetrics();
  }, [seller]);

  // Error state
  if (error) {
    return (
      <SellerLayout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold mb-2">Error Loading Dashboard</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </SellerLayout>
    );
  }

  // Loading state
  if (loading || isLoadingMetrics) {
    return (
      <SellerLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </SellerLayout>
    );
  }

  if (!seller) {
    return null;
  }

  const isBusiness = seller.sellerType === 'business';
  const listingLimit = isBusiness ? 'Unlimited' : '1';
  const remainingListings = isBusiness ? 'Unlimited' : Math.max(0, 1 - (metrics?.totalListings || 0));

  // Prepare chart data
  const salesChartData = {
    labels: metrics?.salesData?.map(item => new Date(item.day).toLocaleDateString()) || [],
    datasets: [
      {
        label: 'Daily Earnings (₹)',
        data: metrics?.salesData?.map(item => item.daily_earnings) || [],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const statusChartData = {
    labels: statusCounts.map(item => item.status),
    datasets: [
      {
        data: statusCounts.map(item => item.count),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <SellerLayout>
      <div className="min-h-[calc(100vh-4rem)] w-full p-4 md:p-6 bg-gray-50 text-gray-900">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-blue-00 p-6 rounded-xl shadow-sm text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-black">Welcome, {seller.name}!</h1>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Listings"
              value={metrics?.totalListings || 0}
              icon={<FiSmartphone className="text-xl" />}
              trend="up"
              trendValue="5% from last month"
            />
            <MetricCard
              title="Pending Orders"
              value={metrics?.pendingOrders || 0}
              icon={<FiClock className="text-xl" />}
              trend="down"
              trendValue="10% from last week"
              className="border-l-4 border-yellow-500"
            />
            <MetricCard
              title="Completed Orders"
              value={metrics?.completedOrders || 0}
              icon={<FiCheckCircle className="text-xl" />}
              trend="up"
              trendValue="15% from last month"
              className="border-l-4 border-green-500"
            />
            <MetricCard
              title="Total Earnings"
              value={`Rs. ${(metrics?.totalEarnings || 0).toLocaleString()}`}
              icon={<FiArrowUpCircle className="text-xl" />}
              trend="up"
              trendValue="20% from last month"
              className="border-l-4 border-blue-500"
            />
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Sales Performance (30 Days)</h2>
                <FiTrendingUp className="text-blue-600 text-xl" />
              </div>
              <div className="h-64">
                <Bar 
                  data={salesChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          drawBorder: false,
                        },
                      },
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Listing Status</h2>
                <FiPieChart className="text-blue-600 text-xl" />
              </div>
              <div className="h-64">
                <Pie 
                  data={statusChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Main Grid: Account Info + Quick Actions */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Account Status */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Account Overview</h2>
                  <MdOutlineBusiness className="text-blue-600 text-xl" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Account Type</span>
                    <span className="font-medium text-gray-800">
                      {isBusiness ? 'Business' : 'Individual'}
                      {!isBusiness && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Upgrade available
                        </span>
                      )}
                    </span>
                  </div>
                  </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <OptionCard
                  title="List a Phone"
                  description="Add a new phone to your inventory"
                  icon={<MdOutlineSell />}
                  link="/seller/SellerDashboard"
                />
                {!isBusiness && (
                  <OptionCard
                    title="Upgrade to Business"
                    description="Get unlimited listings and more features"
                    icon={<FaBusinessTime />}
                    link="/seller/BusinessRegister"
                  />
                )}
                <OptionCard
                  title="View Orders"
                  description="Manage your current and past orders"
                  icon={<FiDollarSign />}
                  link="/seller/orders"
                />
                <OptionCard
                  title="Selling Guidelines"
                  description="Learn how to list responsibly"
                  icon={<RiGuideLine />}
                  link="/seller/guidelines"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerHomePage;