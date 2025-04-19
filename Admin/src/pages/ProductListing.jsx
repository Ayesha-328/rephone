import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/verification-list', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      setProducts(response.data.requests);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleViewDetails = (imei) => {
    navigate(`/products/${imei}`);
  };

  const handleVerify = async (imei) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/verify/${imei}`, 
        { status: 'verified' },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        }
      );
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Error verifying product:', error);
    }
  };

  const handleReject = async (imei) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/verify/${imei}`, 
        { status: 'rejected' },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        }
      );
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Error rejecting product:', error);
    }
  };

  return (
    <div className="product-listing">
      <h1>Product Listing</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.imeiNumber}
            product={product}
            onViewDetails={handleViewDetails}
            onVerify={handleVerify}
            onReject={handleReject}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;