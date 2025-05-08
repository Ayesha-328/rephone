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
        const response = await fetchOrders();
        
        console.log("Raw orders from API:", response);

        // Handle different response formats
        let ordersData = response;
        
        // If response is wrapped in data property
        if (response && response.data && Array.isArray(response.data)) {
          ordersData = response.data;
        }
        
        // Final check to ensure we have an array
        if (!Array.isArray(ordersData)) {
          console.error("Fetched data is not an array", ordersData);
          setOrders([]);
          return;
        }

        const transformedOrders = ordersData.map((order) => ({
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

        console.log("Transformed orders:", transformedOrders);
        setOrders(transformedOrders);
      } catch (error) {
        console.error("Error loading seller orders:", error);
        setOrders([]);
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
        <p className="font-[Montserrat] text-xl left-5 font-bold text-[#003566] pt-2 pb-2 relative lg:left-33 lg:text-3xl">
                My Orders
            </p>    
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
                    <strong>Delivery Address:</strong> {order.housenumber ? `${order.housenumber}, ` : ''} 
                    {order.street ? `${order.street}, ` : ''} 
                    {order.area ? `${order.area}, ` : ''} 
                    {order.city}
                  </p>
                  {order.specialinstruction && (
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Note:</strong> {order.specialinstruction}
                    </p>
                  )}
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Items:</h3>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.itemname} × {item.quantity} — Rs. {(item.price * item.quantity).toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 text-right font-semibold text-gray-900">
                    Total: Rs. {order.totalprice.toLocaleString()}
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