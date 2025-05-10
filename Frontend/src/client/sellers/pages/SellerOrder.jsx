import React, { useEffect, useState } from 'react';
import { useSellerAuth } from '../context/SellerAuthContext';
import SellerLayout from '../components/SellerLayout';
import { FiPackage, FiUser, FiMapPin, FiDollarSign, FiMessageSquare } from 'react-icons/fi';

const SellerOrdersPage = () => {
  const { fetchOrders } = useSellerAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  let isMounted = true; // To prevent state updates on unmounted component

  const loadOrders = async () => {
    try {
      const response = await fetchOrders();

      if (!response || !response.data || !Array.isArray(response.data)) {
        console.warn("No orders found or bad response:", response);
        if (isMounted) {
          setOrders([]);
        }
        return;
      }

      const transformedOrders = response.data.map((order) => ({
        orderid: order.orderId,
        orderstatus: order.orderStatus,
        customername: order.buyername,
        city: order.buyercity || '',
        housenumber: order.buyerhousenumber || '',
        street: order.buyerstreet || '',
        area: order.buyerarea || '',
        totalprice: order.sellertotalprice || 0,
        specialinstruction: order.specialinstruction || '',
        items: (order.soldproducts || []).map((product) => ({
          itemname: product.model || 'Unnamed Item',
          quantity: product.quantity || 1,
          price: product.price || (order.sellertotalprice / (product.quantity || 1)),
        })),
      }));

      if (isMounted) {
        setOrders(transformedOrders);
      }
    } catch (error) {
      console.error("Error loading seller orders:", error);
      if (isMounted) {
        setOrders([]);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  loadOrders();

  return () => {
    isMounted = false; 
  };
}, []); 

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <SellerLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#003566]">My Order</h1>
              <p className="text-gray-600 mt-1">
                {loading ? 'Loading...' : `${orders.length} ${orders.length === 1 ? 'order' : 'orders'} found`}
              </p>
            </div>
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
              <p className="mt-1 text-gray-500">When you receive orders, they'll appear here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.orderid}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-[#003566] text-white p-2 rounded-lg mr-4">
                          <FiPackage className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-gray-800">
                            Order #{order.orderid}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 sm:mt-0">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderstatus)}`}>
                          {order.orderstatus}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                          <FiUser className="mr-2 text-[#FF9F1C]" />
                          Customer Information
                        </h3>
                        <div className="space-y-2 pl-6">
                          <p className="text-gray-800">{order.customername}</p>
                          <p className="text-gray-600">
                            {[order.housenumber, order.street, order.area, order.city]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                          <FiDollarSign className="mr-2 text-[#FF9F1C]" />
                          Order Summary
                        </h3>
                        <div className="space-y-2 pl-6">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-gray-800">
                                {item.itemname} × {item.quantity}
                              </span>
                              <span className="text-gray-600">
                                Rs. {(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))}
                          <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-medium">
                            <span className="text-gray-800">Total</span>
                            <span className="text-[#003566]">
                              Rs. {order.totalprice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {order.specialinstruction && (
                      <div className="mt-6 bg-blue-50 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                          <FiMessageSquare className="mr-2 text-[#FF9F1C]" />
                          Customer Note
                        </h3>
                        <p className="text-gray-700 italic pl-6">
                          "{order.specialinstruction}"
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end">
                    <button className="text-sm font-medium text-[#FF9F1C] hover:text-[#e58a0e]">
                      View Details →
                    </button>
                  </div>
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