import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Header } from "../../../components/Header";
import  Footer  from "../../../components/Footer";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderAndPhones = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/order/${orderId}`);
        const { order, subOrders } = data;

        // Fetch phone details for each item
        const subOrdersWithDetails = await Promise.all(
          subOrders.map(async (sub) => {
            const itemsWithPhones = await Promise.all(
              sub.items.map(async (item) => {
                try {
                  const res = await axios.get(`http://localhost:5000/api/product/${item.productId}`);
                  return { ...item, phoneDetails: res.data };
                } catch (err) {
                  console.error(`Failed to fetch phone for productId ${item.productId}`);
                  return { ...item, phoneDetails: null };
                }
              })
            );
            return { ...sub, items: itemsWithPhones };
          })
        );

        setOrderData({ order, subOrders: subOrdersWithDetails });
      } catch (err) {
        setError("Failed to fetch order or product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderAndPhones();
  }, [orderId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error || !orderData) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  const { order, subOrders } = orderData;
  const buyer = order.buyer;

  return (
    <>
    <Header />
    <div className="min-h-screen w-[99vw] bg-[#003566] py-10 px-4">
      <div className="max-w-5xl mt-14 mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-[#003566] mb-4 text-center">
          🎉 Order Confirmed!
        </h1>
        <p className="text-center text-gray-700 mb-4">
          Thank you for your order. Here are your order details.
        </p>
        <div className="text-center mb-6">
          <span className="text-sm text-gray-600">Order ID:</span>
          <p className="text-lg font-bold text-[#003566]">{orderId}</p>
        </div>

        <div className="border-t pt-4 space-y-4">
          <h2 className="text-xl font-semibold text-[#003566]">Buyer Information</h2>
          <div className="grid grid-cols-2 gap-4 text-gray-800">
            <div><strong>Name:</strong> {buyer.name}</div>
            <div><strong>Email:</strong> {buyer.email}</div>
            <div><strong>Phone:</strong> {buyer.phoneNumber}</div>
            <div><strong>City:</strong> {buyer.city}</div>
            <div><strong>Area:</strong> {buyer.area}</div>
            <div><strong>Street:</strong> {buyer.street}</div>
            <div><strong>House #:</strong> {buyer.houseNumber}</div>
            <div><strong>Landmark:</strong> {buyer.nearestLandmark}</div>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-semibold text-[#003566] mb-2">Ordered Phones</h2>
          {subOrders.map((sub, index) => (
            <div key={sub.subOrderId} className="mb-6 p-4 border rounded-lg">
              <h3 className="text-md font-bold text-gray-800 mb-2">Sub-Order {index + 1}</h3>
              {sub.items.map((item, i) => {
                const phone = item.phoneDetails;
                console.log(phone);
                return (
                  <div key={i} className="mb-3 p-3 bg-gray-100 text-black rounded-lg">
                    {phone ? (
                      <>
                      <div className="flex justify-around">
                        <div className="flex gap-2">

<img src={phone.phoneImage[0]} alt="" className="w-20 h-20"/>
<div>

                        <p><strong>Brand:</strong> {phone.phone_brand.charAt(0).toUpperCase() + phone.phone_brand.slice(1)}</p>
                        <p><strong>Model:</strong> {phone.phone_model}</p>
</div>
                        </div>

                      <div>

                        <p><strong>Price:</strong> Rs. {phone.price}</p>
                        <p><strong>Seller:</strong> {phone.sellerName} ({phone.userName})</p>
                
                      </div>
                      </div>
                      </>
                    ) : (
                      <p className="text-red-600">Failed to load phone details</p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="px-6 py-2 bg-[#003566] text-white rounded-xl hover:bg-[#002244] transition-all duration-200"
          >
            Go Back to Homepage
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default OrderConfirmation;
