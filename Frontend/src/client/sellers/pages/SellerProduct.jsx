import React, { useEffect, useState } from 'react';
import { useSellerAuth } from '../context/SellerAuthContext';
import SellerLayout from '../components/SellerLayout';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  let images = [];

  try {
    images = typeof product.phoneImage === 'string'
      ? JSON.parse(product.phoneImage)
      : product.phoneImage;
  } catch (err) {
    console.error('Error parsing phoneImage:', err);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start space-x-4">
          {images && images.length > 0 && (
            <div className="flex-shrink-0">
              <img
                src={images[0]}
                alt={product.phone_model || 'Product Image'}
                className="w-20 h-20 object-cover rounded-lg"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {product.phone_model || 'Model Not Provided'}
            </h3>
            <p className="text-xl font-bold text-[#003566] mt-1">Rs. {product.price}</p>
            <div className="mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                product.status === 'verified' 
                  ? 'bg-green-100 text-green-800' 
                  : product.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {product.status}
              </span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

const SellerProduct = () => {
  const { seller, fetchProducts, products, productsLoading } = useSellerAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      if (seller?.sellerId && (!products || products.length === 0)) {
        setIsLoading(true);
        await fetchProducts();
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, [seller]);

  return (
    <SellerLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#003566]">My Listed Products</h1>
              <p className="text-gray-600 mt-1">
                {products?.length || 0} {products?.length === 1 ? 'product' : 'products'} listed
              </p>
            </div>
     
          </div>

          {isLoading || productsLoading ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF9F1C]"></div>
              </div>
              <p className="mt-3 text-gray-600">Loading your products...</p>
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.productid} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No products listed</h3>
              <p className="mt-1 text-gray-500">Get started by listing your first product.</p>
              <div className="mt-6">
                <Link
                  to="/seller/SellerDashboard"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF9F1C] hover:bg-[#e58a0e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9F1C]"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  New Product
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerProduct;