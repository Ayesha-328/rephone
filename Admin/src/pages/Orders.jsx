import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');  // No need to manually add token, axios handles it with credentials
        setOrders(response.data.orders);  // Assuming response contains an 'orders' field
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="product-listing">
      <div className="dashboard-header">
        <h2>Order Details</h2>
      </div>

      <div className="products-container">
        {orders.length === 0 ? (
          <div>No orders found</div>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Buyer Name</th>
                <th>Seller Name</th>
                <th>Product Name</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.buyername}</td>
                  <td>
                    {order.sellers.map((seller, index) => (
                      <div key={index}>
                        <strong>{seller.sellerName}</strong>
                        <p>Email: {seller.sellerEmail}</p>
                        <p>Phone: {seller.sellerPhoneNumber}</p>
                        <p>City: {seller.sellerCity}</p>
                      </div>
                    ))}
                  </td>
                  <td>
  {order.soldproducts.map((product, index) => (
    <div key={index}>
      <strong>{product.model}</strong>
      <p>Brand: {product.brand}</p>
      <p>IMEI No: {product.imeiNo}</p>
      {Array.isArray(product.phoneImages) && product.phoneImages.length > 0 ? (
        <img
          src={product.phoneImages[0]}
          alt={product.model}
          style={{ width: '50px', height: 'auto' }}
        />
      ) : (
        <div>No Image Available</div>
      )}
    </div>
  ))}
</td>

                  <td>{order.totalPrice}</td>
                  <td>{order.orderStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;