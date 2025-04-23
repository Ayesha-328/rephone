import { useState, useEffect } from 'react';
import api from '../utils/api';

const VerificationModal = ({ imei, onClose, onVerified }) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        fetchImeiDetails();
    }, [imei]);

    const fetchImeiDetails = async () => {
        try {
            const response = await api.get(`/verify/${imei}`);
            console.log('IMEI details:', response.data);
            setDetails(response.data.phoneDetails);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching IMEI details:', err);
            setError('Failed to fetch IMEI details');
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (status) => {
        try {
            setProcessing(true);
            setError(null);
            await api.put(`/verify/${imei}`, { status });
            onVerified();
            onClose();
        } catch (err) {
            setError(`Failed to ${status} phone`);
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="loading">Loading...</div>
            </div>
        </div>
    );

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-header">
                    <h2>IMEI Verification Details</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                {details && (
                    <div className="modal-content">
                        <div className="image-section">
                            {details.phoneImage && details.phoneImage.length > 0 ? (
                                <img 
                                    src={`data:image/jpeg;base64,${details.phoneImage[0]}`}
                                    alt="Phone"
                                    className="phone-image"
                                />
                            ) : (
                                <div className="no-image">No Image Available</div>
                            )}
                        </div>

                        <div className="info-section">
                            <div className="info-group">
                                <h3>Phone Information</h3>
                                <div className="info-item">
                                    <span>Brand:</span> {details.phone_brand || 'N/A'}
                                </div>
                                <div className="info-item">
                                    <span>Model:</span> {details.phone_model || 'N/A'}
                                </div>
                                <div className="info-item">
                                    <span>IMEI:</span> {imei}
                                </div>
                                <div className="info-item">
                                    <span>Submit Date:</span> {new Date(details.submitDate).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="info-group">
                                <h3>Seller Information</h3>
                                <div className="info-item">
                                    <span>Name:</span> {details.sellerName}
                                </div>
                                <div className="info-item">
                                    <span>Email:</span> {details.sellerEmail}
                                </div>
                                <div className="info-item">
                                    <span>Type:</span> {details.sellerType}
                                </div>
                            </div>

                            <div className="info-group">
                                <h3>Verification Status</h3>
                                <div className={`status-box ${details.verificationStatus === 'Invalid IMEI' ? 'invalid' : ''}`}>
                                    {details.verificationStatus || 'Status not available'}
                                </div>
                            </div>
                        </div>

                        <div className="button-group">
                            <button 
                                className="verify-btn"
                                onClick={() => handleStatusUpdate('verified')}
                                disabled={processing}
                            >
                                Verify Phone
                            </button>
                            <button 
                                className="reject-btn"
                                onClick={() => handleStatusUpdate('rejected')}
                                disabled={processing}
                            >
                                Reject Phone
                            </button>
                            <button 
                                className="cancel-btn"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerificationModal;
