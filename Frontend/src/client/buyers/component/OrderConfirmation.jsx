import React from "react";
import { useParams, Link } from "react-router-dom";

const OrderConfirmation = () => {
  const { orderId } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-[#003566] font-[Montserrat] mb-6">
          🎉 Order Confirmed!
        </h1>
        <img src="/confirm.svg" alt="Confirmation Icon" className="w-24 h-24 mx-auto mb-6" />
        <p className="text-lg font-[Merriweather] mb-4">
          Your Order ID is: <br />
          <span className="text-[#003566] font-[Montserrat] font-semibold text-xl">{orderId}</span>
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2 bg-[#003566] text-white rounded-xl shadow-md hover:bg-[#002244] transition-all duration-200 font-[Merriweather]"
        >
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
