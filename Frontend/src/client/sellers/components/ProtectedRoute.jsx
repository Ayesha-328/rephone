import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSellerAuth } from '../context/SellerAuthContext';

const ProtectedRoute = ({ children }) => {
    const { seller, loading } = useSellerAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!seller) {
        return <Navigate to="/seller/login" replace />;
    }

    return children;
};

export default ProtectedRoute; 