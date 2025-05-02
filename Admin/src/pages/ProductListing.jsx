import { useState, useEffect } from 'react';
import api from '../utils/api';

const ProductListing = () => {
  const [verifiedPhones, setVerifiedPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerifiedPhones = async () => {
      try {
        const response = await api.get('/verified-phones');
        setVerifiedPhones(response.data.phones || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch verified phones');
        setLoading(false);
      }
    };

    fetchVerifiedPhones();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  if (!Array.isArray(verifiedPhones)) {
    return <div className="error-message">No verified phones data available</div>;
  }

  return (
    <div className="product-listing">
      <div className="dashboard-header">
        <h2>Verified Products</h2>
      </div>

      <div className="products-container">
        {verifiedPhones.length === 0 ? (
          <div>No verified phones found</div>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>IMEI</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Verified By</th>
                <th>Verification Date</th>
              </tr>
            </thead>
            <tbody>
              {verifiedPhones.map((phone) => (
                <tr key={phone.imeiNumber}>
                  <td>
                    {phone.phoneImage && phone.phoneImage.length > 0 ? (
                      <img 
                        src={phone.phoneImage[0]} 
                        alt="Phone" 
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                      />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </td>
                  <td>{phone.imeiNumber}</td>
                  <td>{phone.phone_brand}</td>
                  <td>{phone.phone_model}</td>
                  <td>{phone.adminName}</td>
                  <td>{new Date(phone.submitDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
