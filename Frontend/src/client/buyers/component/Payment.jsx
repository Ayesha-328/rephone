import React, { useState } from "react";
import { useCart } from "./CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";

const Payment = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();

    // All original constants and calculations
    const deliveryCharges = 1000;
    const taxRate = 0.17;
    const platform = 0.003;

    const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
    const tax = subtotal * taxRate;
    const platformFee = subtotal * platform;
    const orderTotal = (subtotal + deliveryCharges + tax + platformFee).toFixed(2);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        city: "",
        area: "",
        street: "",
        houseNumber: "",
        nearestLandmark: "",
    });

    // Keep all handlers exactly the same
    const handleInputChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCOD = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/order/create", {
                ...formData,
                items: cartItems.map((item) => item.productid),
                paymentMethod: "COD",
            });

            if (response.data.paymentMethod === "COD") {
                navigate(`/order-confirmation/${response.data.orderId}`);
            }
        } catch (error) {
            console.error("Order creation failed:", error);
            alert("Error while placing order");
        }
    };

    const handleSafePay = async () => {
        try {
            const orderResponse = await axios.post("http://localhost:5000/api/order/create", {
                ...formData,
                items: cartItems.map((item) => item.productid),
                paymentMethod: "SafePay",
            });

            const { orderId } = orderResponse.data;

            const response = await axios.post(`http://localhost:5000/api/payment/initiate/${orderId}`);

            if (response.data.redirectUrl) {
                window.location.href = response.data.redirectUrl;
            }
        } catch (error) {
            console.error("SafePay initiation failed:", error);
            alert("Error while initiating SafePay payment");
        }
    };

    return (
        <div className="flex flex-col min-h-screen min-w-screen bg-[#003566] px-10">
            <Header />
            
            {/* Main content container - properly centered */}
            <div className="flex-grow flex justify-center items-start w-full px-4 sm:px-6 lg:px-8 pt-28 pb-16">
                <div className="w-full max-w-7xl bg-white shadow-xl rounded-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-[#FF9F1C] px-6 py-4">
                        <h2 className="text-2xl font-bold text-white">Complete Your Purchase</h2>
                    </div>

                    <div className="flex flex-col lg:flex-row bg-gray-800 ">
                        {/* LEFT SIDE: Cart and Order Summary */}
                        <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 border-b lg:border-b-0 lg:border-r">
                            <h3 className="text-xl font-semibold text-white mb-4">Order Summary</h3>
                            <div className=" border-gray-100">
                                {/* Cart Items */}
                                <div className="bg-gray-100 divide-y divide-white">
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="p-4">
                                            <div className="flex items-start gap-4">
                                                <img 
                                                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-gray-200" 
                                                    src={item.image} 
                                                    alt={item.phone_model} 
                                                />
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-[#003566]">{item.phone_model}</h4>
                                                    <p className="text-sm text-green-600 mt-1">In stock</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">Rs. {item.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Details */}
                                <div className="p-4 bg-gray-100 rounded-b-lg">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span>Rs. {subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Delivery Charges</span>
                                            <span>Rs. {deliveryCharges.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Platform Fee (0.3%)</span>
                                            <span>Rs. {platformFee.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tax (17% GST)</span>
                                            <span>Rs. {tax.toFixed(2)}</span>
                                        </div>
                                        <div className="h-px bg-gray-200 my-2"></div>
                                        <div className="flex justify-between font-semibold text-base">
                                            <span>Total</span>
                                            <span className="text-[#003566]">Rs. {orderTotal}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Payment Methods */}
                                <div className="pt-7">
                                    <h3 className="text-xl font-semibold text-white mb-4">Payment Method</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        <button
                                            onClick={handleSafePay}
                                            className="flex items-center justify-center bg-gray-300 text-[#FF9F1C] font-medium py-3 px-6 rounded-lg"
                                        >
                                            <span className="mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1h10a1 1 0 011 1v1H4V7a1 1 0 011-1zm0 3v6h10V9H5z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                            Pay with SafePay
                                        </button>
                                        <button
                                            onClick={handleCOD}
                                            className="flex items-center justify-center bg-gray-300 text-[#FF9F1C] font-medium py-3 px-6 rounded-lg"
                                        >
                                            <span className="mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                            Cash on Delivery
                                        </button>
                                    </div>
                            </div>
                        </div>
                        </div>

                        {/* RIGHT SIDE: Customer Information Form */}
                        <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8">
                            <h3 className="text-xl font-semibold text-white">Customer Information</h3>
                            <div className="space-y-4 text-white">
                                {[
                                    { label: "Name", name: "name", type: "text" },
                                    { label: "Email", name: "email", type: "email" },
                                    { label: "Phone Number", name: "phoneNumber", type: "tel" },
                                    { label: "City", name: "city", type: "text" },
                                    { label: "Area", name: "area", type: "text" },
                                    { label: "Street", name: "street", type: "text" },
                                    { label: "House Number", name: "houseNumber", type: "text" },
                                    { label: "Nearest Landmark", name: "nearestLandmark", type: "text" },
                                ].map((field, index) => (
                                    <div key={index} className="flex flex-col">
                                        <label className="text-sm font-medium text-white mb-1" htmlFor={field.name}>
                                            {field.label} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id={field.name}
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003566] focus:border-transparent transition"
                                            required
                                        />
                                    </div>
                                ))}

                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;