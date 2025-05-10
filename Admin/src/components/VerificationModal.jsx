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
                                    src={details.phoneImage[0]} // Removed base64 conversion as you're using Cloudinary URLs
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
                                    <span>Name:</span> {details.sellerName || 'N/A'}
                                </div>
                                <div className="info-item">
                                    <span>Email:</span> {details.sellerEmail || 'N/A'}
                                </div>
                                <div className="info-item">
                                    <span>Type:</span> {details.sellerType || 'N/A'}
                                </div>
                            </div>

                            <div className="info-group">
                                <h3>Verification Status</h3>
                                {details.verificationStatus && (
                                    <>
                                        <div className="info-item">
                                            <span>IMEI:</span> {details.verificationStatus.imei_number || 'N/A'}
                                        </div>
                                        <div className="info-item">
                                            <span>Status:</span> 
                                            <span className={`status-indicator ${
                                                details.verificationStatus.device_is_clean === "true" 
                                                    ? "clean" 
                                                    : "blacklisted"
                                            }`}>
                                                {details.verificationStatus.device_is_clean === "true" 
                                                    ? "Clean" 
                                                    : "Blacklisted"}
                                            </span>
                                        </div>
                                        {details.verificationStatus.device_is_clean !== "true" && (
                                            <div className="info-item">
                                                <span>Reason:</span> {details.verificationStatus.blacklist_reason || 'Not specified'}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="button-group">
                            <button 
                                className="verify-btn"
                                onClick={() => handleStatusUpdate('verified')}
                                disabled={processing}
                            >
                                {processing ? 'Processing...' : 'Verify Phone'}
                            </button>
                            <button 
                                className="reject-btn"
                                onClick={() => handleStatusUpdate('rejected')}
                                disabled={processing}
                            >
                                {processing ? 'Processing...' : 'Reject Phone'}
                            </button>
                            <button 
                                className="cancel-btn"
                                onClick={onClose}
                                disabled={processing}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerificationModal;