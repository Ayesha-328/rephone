import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { imei } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/verify/${imei}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        setDetails(response.data.phoneDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [imei]);

  if (loading) return <div>Loading...</div>;
  if (!details) return <div>Product not found</div>;

  return (
    <div className="product-details">
      <h1>Product Details</h1>
      <div className="details-card">
        <div className="product-images">
          {details.phoneImage.map((image, index) => (
            <img 
              key={index}
              src={`data:image/jpeg;base64,${image}`}
              alt={`Product view ${index + 1}`}
            />
          ))}
        </div>
        <div className="details-info">
          <h2>Seller Information</h2>
          <p>Name: {details.sellerName}</p>
          <p>Email: {details.sellerEmail}</p>
          <p>Type: {details.sellerType}</p>

          <h2>Phone Information</h2>
          <p>Brand: {details.phone_brand}</p>
          <p>Model: {details.phone_model}</p>
          <p>IMEI: {imei}</p>

          <h2>Verification Status</h2>
          <p>Status: {details.verificationStatus}</p>

          <div className="action-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/products')}
            >
              Back to Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;