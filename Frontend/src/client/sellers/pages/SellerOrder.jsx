import React, { useEffect, useState } from 'react';
import { useSellerAuth } from '../context/SellerAuthContext';
import SellerLayout from '../components/SellerLayout';
import {
  FiPackage, FiUser, FiMapPin, FiDollarSign, FiMessageSquare,
} from 'react-icons/fi';

const SellerOrdersPage = () => {
  const { fetchOrders } = useSellerAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        if (isMounted) setOrders(data || []);
      } catch (err) {
        console.error('Error loading orders:', err);
        if (isMounted) setOrders([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadOrders();
    return () => { isMounted = false; };
  }, []);

  const getStatusColor = (status) => {
    const colorMap = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      shipped: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-purple-100 text-purple-800',
    };
    return colorMap[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  return (
    <SellerLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#003566]">My Orders</h1>
            <p className="text-gray-600 mt-1">
              {loading ? 'Loading...' : `${orders.length} ${orders.length === 1 ? 'order' : 'orders'} found`}
            </p>
          </div>

          {loading ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF9F1C]"></div>
              </div>
              <p className="mt-3 text-gray-600">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200">
              <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
              <p className="text-gray-500">When customers place orders, you'll see them here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.orderId} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Order #{order.orderId}</h2>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
                    <div className="flex items-center space-x-2">
                      <FiUser className="text-[#003566]" />
                      <span>{order.buyername}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiMapPin className="text-[#003566]" />
                      <span>{order.buyercity}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiDollarSign className="text-[#003566]" />
                      <span className="font-semibold">Rs {order.sellertotalprice}</span>
                    </div>
                  </div>

                  {order.soldproducts && order.soldproducts.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-gray-800 mb-2">Products Sold:</h3>
                      <ul className="text-sm space-y-1 pl-4 list-disc text-gray-700">
                        {order.soldproducts.map((product, idx) => (
                          <li key={idx}>
                            {product.brand} {product.model} — IMEI: {product.imeiNo}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerOrdersPage;
