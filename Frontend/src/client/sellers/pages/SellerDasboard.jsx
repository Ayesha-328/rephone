import React from "react";
import { SellerForm } from "../components/SellerForm";
import { useSellerAuth } from '../context/SellerAuthContext';
import SellerLayout from '../components/SellerLayout';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const SellerDashboard = () => {
  const { seller, loading, fetchProfile } = useSellerAuth();
  const navigate = useNavigate();

  // Check authentication status when component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Only attempt to fetch profile if loading is true (initial load)
        if (loading) {
          await fetchProfile();
        }
      } catch (error) {
        toast.error('Session expired. Please login again.');
        navigate('/seller/login');
      }
    };

    checkAuth();
  }, [fetchProfile, loading, navigate]);

  if (loading) {
    return (
      <SellerLayout>

      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      <div>
        {seller ? (
          <>
            <SellerForm />
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg mb-4">Please log in to access the dashboard.</p>
            <button
              onClick={() => navigate('/seller/login')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </SellerLayout>
  );
};