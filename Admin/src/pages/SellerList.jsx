import React, { useEffect, useState } from 'react';
import api from '../utils/api'; 

const SellerList = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await api.get('/sellers');
        console.log('Seller API response:', response.data);
        setSellers(response.data.sellers || []);
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };

    fetchSellers();
  }, []); // ✅ Fetch only once when the component mounts

  return (
    <div className="product-listing">
      <div className="dashboard-header">
        <h2>Sellers</h2>
      </div>

      <div className="products-container">
        {sellers.length === 0 ? (
          <div>No sellers found</div>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>City</th>
                <th>Area</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, index) => (
                <tr key={seller.sellerId || `${seller.sellerEmail}-${index}`}>
                  <td>{seller.sellerName}</td>
                  <td>{seller.sellerEmail}</td>
                  <td>{seller.sellerContact}</td>
                  <td>{seller.city}</td>
                  <td>{seller.area}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SellerList;