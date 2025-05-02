import { useState, useEffect } from 'react';
import api from '../utils/api';
import VerificationModal from '../components/VerificationModal';

const ListedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImei, setSelectedImei] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/verification-list');
            console.log('Products:', response.data);
            setProducts(response.data.requests || []);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    const handleVerifyClick = (imei) => {
        setSelectedImei(imei);
    };

    const handleModalClose = () => {
        setSelectedImei(null);
    };

    const handleVerified = () => {
        // Refresh the products list after verification
        fetchProducts();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="products-container">
            <h2>Listed Products</h2>
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>IMEI</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Seller</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan="7">No products available</td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product.imeiNumber}>
                                 <td>
                    {product.phoneImage && product.phoneImage.length > 0 ? (
                      <img 
                        src={product.phoneImage[0]} 
                        alt="Phone" 
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                      />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </td>
                                <td>{product.imeiNumber}</td>
                                <td>{product.phone_brand}</td>
                                <td>{product.phone_model}</td>
                                <td>{product.sellerName}</td>
                                <td>
                                    <span className="status-badge pending">
                                        Pending
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        onClick={() => handleVerifyClick(product.imeiNumber)}
                                        className="verify-button"
                                    >
                                        Check IMEI details
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {selectedImei && (
                <VerificationModal 
                    imei={selectedImei}
                    onClose={handleModalClose}
                    onVerified={handleVerified}
                />
            )}
        </div>
    );
};

export default ListedProducts;
