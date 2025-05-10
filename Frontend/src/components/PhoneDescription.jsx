import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../client/buyers/component/CartContext';
import { Header } from './Header';
import Footer from './Footer';

const ProductDescription = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:5000/api/product/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                console.log("Fetched Product Data:", data);
                setProduct(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error loading product:", err);
                setIsLoading(false);
            });
    }, [id]);

    const getImageSource = () => {
        if (Array.isArray(product?.phoneImage) &&
            product.phoneImage.length > 0 &&
            typeof product.phoneImage[0] === 'string' &&
            (product.phoneImage[0].startsWith('http') || product.phoneImage[0].startsWith('data:'))
        ) {
            return product.phoneImage[0];
        }
        return '/api/placeholder/400/500'; // fallback
    };

    const handleAddToCart = () => {
        const item = {
            productid: product.productid,
            phone_model: product.phone_model,
            price: product.price,
            image: getImageSource()
        };
        addToCart(item);
        alert(`${product.phone_model} added to cart!`);
        navigate('/cart');
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900">
                <div className="text-white text-xl font-medium animate-pulse">
                    Loading product details...
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900">
                <div className="text-white text-xl">
                    Product not found or error loading data
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Product Image and Brand */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <div className="mb-6">
                            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 break-words">
                                {product.phone_model}
                            </h1>
                            <p className="mb-4">
                                <span className="text-lg sm:text-xl font-medium text-[#FF9F1C]">Brand: </span>
                                <span className="text-lg sm:text-xl text-white">{product.phone_brand}</span>
                            </p>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-[#FF9F1C] rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                            <div className="relative bg-gray-800 p-1 rounded-2xl">
                                <img
                                    src={getImageSource()}
                                    alt={product.phone_model}
                                    className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-xl"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Product Details */}
                    <div className="w-full lg:w-1/2 ">
                        <div className="bg-gray-800 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-700">
                            <h2 className="text-xl sm:text-2xl font-bold text-[#FF9F1C] mb-4">Product Specifications</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 text-white gap-y-4 gap-x-8">
                                <DetailItem label="Model" value={product.phone_model} />
                                <DetailItem label="OS" value={product.os} />
                                <DetailItem label="RAM" value={`${product.ram} GB`} />
                                <DetailItem label="Storage" value={`${product.storage} GB`} />
                                <DetailItem label="Launch Date" value={product.launch_date} />
                                <DetailItem label="Display" value={product.display_resolution} />
                                <DetailItem label="Video" value={product.video} />
                                <DetailItem label="Price" value={`Rs. ${product.price}`} highlight />
                            </div>

                            <div className="mt-6 border-t border-gray-600 pt-6">
                                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Seller Information</h3>
                                <p className="text-white  break-words">
                                    {product.sellerName} ({product.sellerEmail})
                                </p>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="mt-8 w-full flex-1 py-3 px-4 bg-gradient-to-r from-[#FF9F1C] to-[#FF9F1C] hover:from-[#e68f19] hover:[#e68f19] text-white font-semibold rounded-lg transition-colors duration-300"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

// Helper component for detail items
const DetailItem = ({ label, value, highlight = false }) => (
    <div className="mb-2 break-words">
        <span className="font-semibold text-white">{label}: </span>
        <span className={highlight ? "font-bold text-[#FF9F1C]" : "text-white"}>
            {value}
        </span>
    </div>
);

export default ProductDescription;
