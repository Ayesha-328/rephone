import React from "react";
import { SellerForm } from "../components/SellerForm";
import { useSellerAuth } from '../context/SellerAuthContext';
import SellerLayout from '../components/SellerLayout';

export const SellerDashboard = () => {
  const { seller } = useSellerAuth();

  return (
    <SellerLayout>
      <div>
        {seller ? (
          <SellerForm />
        ) : (
          <p>Please log in to access the dashboard.</p>
        )}
      </div>
    </SellerLayout>
  );
};
