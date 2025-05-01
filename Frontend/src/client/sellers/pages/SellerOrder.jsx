import React, { useEffect, useState } from 'react';
import { useSellerAuth } from '../context/SellerAuthContext';
import SellerLayout from '../components/SellerLayout';

const SellerOrdersPage = () => {
  const { fetchOrders } = useSellerAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        console.log("Fetched orders:", fetchedOrders);

        // Ensure we always set an array (even if undefined or null)
        setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]); // fallback in case of error
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [fetchOrders]);

  return (
    <SellerLayout>
      <div className="min-h-[calc(100vh-4rem)] w-full p-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Orders</h1>
          <p className="text-gray-600 mb-8">View all orders placed for your products</p>

          {loading ? (
            <div className="text-center text-gray-500">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-center text-gray-500">No orders placed yet.</div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {orders.map((order) => (
                <div
                  key={order.orderid}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-8 border-[#FF9F1C]"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">Order #{order.orderid}</h2>
                    <span className="text-sm font-medium text-white bg-[#FF9F1C] px-3 py-1 rounded-full shadow">
                      {order.orderstatus}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Customer:</strong> {order.customername}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Delivery Address:</strong> {order.housenumber}, {order.street}, {order.area}, {order.city}
                  </p>
                  {order.specialinstruction && (
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Note:</strong> {order.specialinstruction}
                    </p>
                  )}
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Items:</h3>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      {order.items?.map((item, idx) => (
                        <li key={idx}>
                          {item.itemname} × {item.quantity} — ₹{item.price * item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 text-right font-semibold text-gray-900">
                    Total: ₹{order.totalprice}
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
