import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  const { orderId } = useParams();

  return (
    <div className="text-center p-4 mt-20 w-100 h-100 absolute top-20 left-120 bg-[#FFFFFF]">
      <p className="mt-5 text-3xl text center font-bold text-[#003566] font-[Montserrat] border-b-1 border-[rgba(0,0,0,0.5)]]">Order Confirmed!</p>
      <img src="/confirm.svg" className="w-20 h-20 mt-10 ml-35" alt="" />
      <p className="mt-5 text-lg font-bold font-[Merriweather]">Your Order ID is <strong className="font-[Montserrat] font-medium text-[#003566]">{orderId}</strong></p>
      <Link
                to="/" className="mt-5 inline-block font-[Merriweather] text-md font-medium text-[#003566]">
                Go Back to Homepage
              </Link>
    </div>
  );
};

export default OrderConfirmation;
