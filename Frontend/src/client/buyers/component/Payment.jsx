
import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
const Payment = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();

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
                items: cartItems.map((item) => item.productid), // ensure you have productid in cartItems
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
            // 1. First create the order
            const orderResponse = await axios.post("http://localhost:5000/api/order/create", {
                ...formData,
                items: cartItems.map((item) => item.productid),
                paymentMethod: "SafePay",
            });
    
            const { orderId } = orderResponse.data;
    
            // 2. Now initiate payment using the orderId
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
       <div>
        <Header/>
         <div className="ml-100 mt-35 mb-10 pb-5 w-170 bg-[#FFFFFF]">
            <div className="border-b-1 border-[rgba(0,0,0,0.5)]">
                <p className="font-[Montserrat] text-xl font-bold text-[#003566] pt-2 pb-2 relative lg:left-5 lg:text-3xl">
                    Payment Information
                </p>
            </div>

            {cartItems.map((item, index) => (
                <div key={index} className="border-1 border-[rgba(0,0,0,0.5)] w-160 mt-5 ml-5 pb-4">
                    <div className="flex ml-5">
                        <img className="w-15 h-20 border-2 border-[#003566]" src={item.image} alt="" />
                        <div>
                            <p className="font-[Merriweather] ml-10 mt-5 font-bold">{item.phone_model}</p>
                            <p className="text-[#00BA00] ml-10">In stock</p>
                            {/* <p className="ml-10">Price: ${item.price}</p> */}
                            <p className="ml-10">Price: ${item.price} + 630 (Platform Fee)</p>
                            <p className="ml-10 font-semibold">Total: ${item.price + 630}</p>

                        </div>
                    </div>
                </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {[
                    { label: "Name", name: "name" },
                    { label: "Email", name: "email" },
                    { label: "Phone no", name: "phoneNumber" },
                    { label: "City", name: "city" },
                    { label: "Area", name: "area" },
                    { label: "Street", name: "street" },
                    { label: "House Number", name: "houseNumber" },
                    { label: "Nearest Landmark", name: "nearestLandmark" },
                ].map((item, index) => (
                    <div key={index} className="lg:w-70 mt-5 flex flex-col col-y-2">
                        <p className="text-md text-[#003566] font-medium mb-2 ml-7">
                            {item.label} <span className="text-[#FF0000]">*</span>
                        </p>
                        <div className="bg-[#FFFFFF] w-70 h-15 flex items-center justify-center border-1 border-[#2B2A2A]/50 ml-5">
                            <input
                                className="font-medium w-60 h-10 ml-5 outline-none border-none"
                                type="text"
                                name={item.name}
                                value={formData[item.name]}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={handleSafePay} className="bg-gradient-to-r from-[#FF9F1C] via-[#FF8F00] to-[#FF7F00] hover:bg-gradient-to-br text-[#FFFFFF] text-3xl font-bold font-[Merriweather] text-center w-70 h-12 lg:w-160 lg:h-12 ml-4 mt-10">
                Pay Throug SafePay
            </button>
            <button onClick={handleCOD} className="bg-gradient-to-r from-[#FF9F1C] via-[#FF8F00] to-[#FF7F00] hover:bg-gradient-to-br text-[#FFFFFF] text-3xl font-bold font-[Merriweather] text-center w-70 h-12 lg:w-160 lg:h-12 ml-4 mt-10">
                COD
            </button>
        </div>
       </div>
    );
};

export default Payment;