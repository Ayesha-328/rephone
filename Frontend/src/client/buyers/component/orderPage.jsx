import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";
import Footer from "../../../components/Footer";

const OrderPage = () => {
    const { cartItems, removeFromCart } = useCart();
    const navigate = useNavigate();
    
  // Constants
const deliveryCharges = 1000;
const taxRate = 0.17;
const platform = 0.003;
// Calculate subtotal
const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);

// Calculate tax
const tax = subtotal * taxRate;
const platformfee= subtotal * platform;

// Calculate total
const orderTotal = (subtotal + deliveryCharges + tax + platformfee).toFixed(2);

    
    // Check if cart is empty
    const isCartEmpty = cartItems.length === 0;

    return (
        <div className="min-h-screen flex flex-col text-white">
            <Header />

            {/* Main Content */}
            <div className="flex-grow container mx-auto pt-24 px-4 sm:px-6 lg:px-8 pb-12">
                <div className="max-w-4xl mx-auto">
                    {/* Page Title */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Your Shopping Cart</h1>
                        <p className="text-gray-400">Review your items before checkout</p>
                    </div>

                    {/* Cart Panel */}
                    <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
                        {/* Cart Header */}
                        <div className="bg-[#FF9F1C]  px-6 py-4">
                            <div className="flex justify-between items-center">
                                <h2 className="font-bold text-xl text-white">
                                    Order Summary
                                </h2>
                                <span className="bg-white text-black bg-opacity-20 px-3 py-1 rounded-full text-sm">
                                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                                </span>
                            </div>
                        </div>

                        {/* Empty Cart Message */}
                        {isCartEmpty && (
                            <div className="py-16 px-4 text-center">
                                <div className="mb-4">
                                    <svg className="w-16 h-16 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                                <p className="text-gray-400 mb-6">Looks like you haven't added any products to your cart yet.</p>
                                <button 
                                    onClick={() => navigate('/catalog')} 
                                    className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-2 rounded-lg transition-colors duration-300"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}

                        {/* Cart Items */}
                        {!isCartEmpty && (
                            <div className="max-h-[400px] overflow-y-auto px-6 py-4 divide-y divide-gray-700">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center py-4 group">
                                        <div className="flex items-start space-x-4 flex-grow">
                                            {/* Product Image */}
                                            <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-700 bg-gray-700">
                                                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 opacity-50"></div>
                                                <img
                                                    className="w-full h-full object-contain mix-blend-normal p-2"
                                                    src={item.image}
                                                    alt={item.phone_model}
                                                />
                                            </div>
                                            
                                            {/* Product Details */}
                                            <div className="flex-grow">
                                                <h3 className="font-semibold text-lg text-white  transition-colors duration-200">
                                                    {item.phone_model}
                                                </h3>
                                                <div className="flex items-center mt-1">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900 text-green-300">
                                                        In stock
                                                    </span>
                                                </div>
                                                <div className="mt-2 text-[#FF9F1C] font-medium">
                                                    Rs. {item.price}
                                                </div>
                                            </div>
                                            
                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeFromCart(item.productid)}
                                                className="ml-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-500 hover:bg-opacity-10 rounded-full transition-colors duration-200"
                                                title="Remove from cart"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Order Total */}
{!isCartEmpty && (
    <div className="border-t border-gray-700 bg-gray-800 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Subtotal</span>
            <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Delivery Charges</span>
            <span className="font-medium">Rs. {deliveryCharges}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Sales Tax (17%)</span>
            <span className="font-medium">Rs. {tax.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Platform Fee (3%)</span>
            <span className="font-medium">Rs. {platformfee.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between font-bold text-lg border-t border-gray-700 pt-4">
            <span>Total</span>
            <span className="text-[#FF9F1C]">Rs. {orderTotal}</span>
        </div>
    </div>
)}

                        {/* Action Buttons */}
                        {!isCartEmpty && (
                            <div className="border-t border-gray-700 px-6 py-4">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() => navigate("/")}
                                        className="flex-1 py-3 px-4 border border-orange-500 text-[#FF9F1C] font-semibold rounded-lg hover:bg-orange-500 hover:bg-opacity-10 transition-colors duration-300"
                                    >
                                        Continue Shopping
                                    </button>
                                    <button
                                        onClick={() => navigate("/checkout")}
                                        className="flex-1 py-3 px-4 bg-gradient-to-r from-[#FF9F1C] to-[#FF9F1C] hover:from-[#e68f19] hover:[#e68f19] text-white font-semibold rounded-lg transition-colors duration-300"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
                    </div>
    );
};

export default OrderPage;