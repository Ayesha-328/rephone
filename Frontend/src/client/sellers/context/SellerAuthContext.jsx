import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const SellerAuthContext = React.createContext();

export const SellerAuthProvider = ({ children }) => {
    const [seller, setSeller] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);

    // Setup axios to include credentials with all requests
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try {
                // Only check auth if we have a potential session
                if (document.cookie.includes('jwt')) {
                    await fetchProfile();
                }
            } catch (error) {
                // Silent fail - no valid session
                setSeller(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const fetchProfile = async () => {
        try {
            console.log('Fetching seller profile using cookie authentication');
            
            // The backend endpoint for fetching the current seller's profile
            // Note: In your backend, this should be protected with JWT verification middleware
            const response = await axios.get('http://localhost:5000/api/seller/profile', {
                withCredentials: true // Ensure cookies are sent with the request
            });

            if (!response.data) {
                throw new Error('No seller data returned from verification');
            }
            
            console.log('Verified seller:', response.data);
            setSeller(response.data);
            setLoading(false);
            return response.data;
        } catch (error) {
            console.error('Error verifying seller:', error.response?.data?.error || error.message);
            setSeller(null);
            setLoading(false);
            throw error;
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            setSeller(null);
    
            console.log('Attempting login with email:', email);
            const response = await axios.post(
                'http://localhost:5000/api/seller/login',
                { email, password },
                { withCredentials: true } // This ensures cookies are accepted
            );
    
            console.log('Login successful');
            
            // Store seller ID for easier reference
            const { userId, sellerId } = response.data;
            
            // Fetch the profile to get seller data
            // Use the userId from login response
            const profileResponse = await axios.get(`http://localhost:5000/api/seller/profile/${userId}`, {
                withCredentials: true
            });
            
            if (profileResponse.data) {
                console.log('Profile fetched:', profileResponse.data);
                // Add the sellerId to the profile data
                setSeller({
                    ...profileResponse.data,
                    userId,
                    sellerId
                });
            }
    
            console.log('Login and verification complete');
            setLoading(false);
            return response.data;
        } catch (error) {
            console.error('Login error:', error.response?.data?.error || error.message);
            setLoading(false);
            throw new Error(error.response?.data?.error || 'Login failed');
        }
    };
    
    const updateSellerProfile = async (formData) => {
        try {
            console.log('Updating profile');
            
            if (!seller || !seller.userId) {
                throw new Error('No seller data available');
            }

            const response = await axios.put(
                `http://localhost:5000/api/seller/profile/${seller.userId}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data' // Changed to multipart/form-data for file uploads
                    }
                }
            );

            toast.success(response.data.message || "Profile updated successfully!");
            await fetchProfile();
            return true;
        } catch (error) {
            console.error('Error updating profile:', error.response?.data?.error || error.message);
            toast.error(error.response?.data?.error || 'Failed to update profile');
            throw error;
        }
    };

    const fetchProducts = async () => {
        try {
            setProductsLoading(true);
            
            if (!seller || !seller.sellerId) {
                throw new Error('No seller ID available');
            }
            
            console.log('Fetching products');
            const response = await axios.get(`http://localhost:5000/api/seller/phones/${seller.sellerId}`, {
                withCredentials: true
            });
    
            if (!response.data || response.data.length === 0) {
                console.log('No products found for this seller');
            } else {
                console.log('Products fetched:', response.data);
                setProducts(response.data);
            }
    
        } catch (error) {
            console.error('Error fetching products:', error.response?.data?.error || error.message);
        } finally {
            setProductsLoading(false);
        }
    };
    
    const fetchOrders = async () => {
        try {
            setOrdersLoading(true);
            
            if (!seller || !seller.sellerId) {
                throw new Error('No seller ID available');
            }
            
            console.log('Fetching orders');
            
            const response = await axios.get(`http://localhost:5000/api/seller/orders/${seller.sellerId}`, {
                withCredentials: true
            });
    
            console.log('Orders fetched:', response.data);
            setOrders(response.data);
            return response.data; // Return the data for the component to use
        } catch (error) {
            console.error('Error fetching orders:', error.response?.data || error);
            if (error.response?.status === 404) {
                setOrders([]);
            }
            return []; // Return empty array in case of error
        } finally {
            setOrdersLoading(false);
        }
    };

    const logout = async () => {
        try {
            console.log('Logging out');
            // Call logout endpoint to clear the cookie
            await axios.post('http://localhost:5000/api/seller/logout', {}, { withCredentials: true });
            
            // Clear state
            setSeller(null);
            setProducts([]);
            setOrders([]);
        } catch (error) {
            console.error('Error during logout:', error);
            // Even if the server-side logout fails, clear the state
            setSeller(null);
            setProducts([]);
            setOrders([]);
        }
    };

    const value = {
        seller,
        setSeller,
        loading,
        login,
        logout,
        updateSellerProfile,
        fetchProducts,
        products,
        productsLoading,
        fetchOrders,
        orders,
        ordersLoading
    };

    return (
        <SellerAuthContext.Provider value={value}>
            {children}
        </SellerAuthContext.Provider>
    );
};

export const useSellerAuth = () => {
    const context = useContext(SellerAuthContext);
    if (!context) {
        throw new Error('useSellerAuth must be used within a SellerAuthProvider');
    }
    return context;
};