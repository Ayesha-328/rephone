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

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId) {
                try {
                    console.log('Initial check: Found userId in localStorage:', storedUserId);
                    await verifySeller(storedUserId);
                } catch (error) {
                    console.error('Error during initial verification:', error);
                    localStorage.removeItem('userId');
                    localStorage.removeItem('sellerId');
                    setSeller(null);
                    setLoading(false);
                }
            } else {
                console.log('No userId found in localStorage');
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const verifySeller = async (userId) => {
        try {
            console.log('Verifying seller with userId:', userId);
            const response = await axios.get(`http://localhost:5000/api/seller/profile/${userId}`, {
                withCredentials: true
            });

            if (!response.data) {
                throw new Error('No seller data returned from verification');
            }
            
            // Get sellerId from localStorage - this is the key change
            const sellerId = localStorage.getItem('sellerId');

            const verifiedSeller = {
                ...response.data,
                userId: userId, // Ensure consistency with localStorage
                sellerId: sellerId // Include the sellerId in the seller object
            };

            console.log('Verified seller with sellerId:', verifiedSeller);
            setSeller(verifiedSeller);
            return verifiedSeller;
        } catch (error) {
            console.error('Error verifying seller:', error.response?.data?.error || error.message);
            localStorage.removeItem('userId');
            localStorage.removeItem('sellerId');
            setSeller(null);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            localStorage.removeItem('userId');
            localStorage.removeItem('sellerId');
            setSeller(null);
    
            console.log('Attempting login with email:', email);
            const response = await axios.post(
                'http://localhost:5000/api/seller/login',
                { email, password },
                { withCredentials: true }
            );
    
            const { userId, sellerId } = response.data;
    
            if (!userId || !sellerId) {
                throw new Error('Invalid login response - missing userId or sellerId');
            }
    
            console.log('Login successful, got userId:', userId, 'and sellerId:', sellerId);
            localStorage.setItem('userId', userId);
            localStorage.setItem('sellerId', sellerId);
    
            await verifySeller(userId);
    
            console.log('Login and verification complete');
            return response.data;
        } catch (error) {
            console.error('Login error:', error.response?.data?.error || error.message);
            setLoading(false);
            throw new Error(error.response?.data?.error || 'Login failed');
        }
    };
    
    const updateSellerProfile = async (formData) => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('No userId found');
            }

            console.log('Updating profile for userId:', userId);

            const response = await axios.put(
                `http://localhost:5000/api/seller/update/${userId}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            toast.success(response.data.message || "Profile updated successfully!");
            await verifySeller(userId);
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
            const sellerId = seller?.sellerId || localStorage.getItem('sellerId');
    
            if (!sellerId) {
                console.error('No sellerId available for fetching products');
                setProductsLoading(false);
                return;
            }
    
            console.log('Fetching products for sellerId:', sellerId);
            const response = await axios.get(`http://localhost:5000/api/seller/phones/${sellerId}`, {
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
            const sellerId = seller?.sellerId || localStorage.getItem('sellerId');

            if (!sellerId) {
                console.error('No sellerId available for fetching orders');
                setOrdersLoading(false);
                return;
            }

            console.log('Fetching orders for sellerId:', sellerId);

            const response = await axios.get(`http://localhost:5000/api/seller/orders/${sellerId}`, {
                withCredentials: true
            });

            console.log('Orders fetched:', response.data);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error.response?.data || error);
            if (error.response?.status === 404) {
                setOrders([]);
            }
        } finally {
            setOrdersLoading(false);
        }
    };

    const logout = () => {
        console.log('Logging out');
        localStorage.removeItem('userId');
        localStorage.removeItem('sellerId');
        setSeller(null);
        setProducts([]);
        setOrders([]);
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