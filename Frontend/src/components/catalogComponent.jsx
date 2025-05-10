import React from "react";
import { Link } from "react-router-dom";

const ProductCatalog = ({ products, className }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center text-gray-600 font-medium text-xl">
          No products available at the moment.
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} w-full max-w-7xl mx-auto`}>
      {/* Product grid with proper spacing and structure */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 py-8">
        {products.map((product) => (
          <div 
            key={product.productid} 
            className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <Link to={`/product/${product.productid}`} className="block">
              {/* Product image container */}
              <div className="relative pt-[100%] bg-gray-100">
                {product.phoneImage?.[0] ? (
                  <img
                    src={product.phoneImage[0]}
                    alt={product.phone_model || `Product ${product.productid}`}
                    className="absolute top-0 left-0 w-full h-full object-contain p-4"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Product details */}
              <div className="p-4">
                {/* Model name */}
                <h3 className="text-gray-900 font-semibold text-lg mb-1 truncate">
                  {product.phone_model || "Unnamed Product"}
                </h3>

                {/* Price */}
                <div className="flex items-center justify-between mt-3">
                  <span className="text-gray-600 text-sm">Price</span>
                  <span className="text-[#002241] font-bold text-lg">
                    Rs. {typeof product.price === "number" ? product.price.toLocaleString() : "N/A"}
                  </span>
                </div>

                {/* View button that appears on hover */}
                <div className="absolute inset-0 bg-gray-400 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-[#FF9F1C] text-white px-4 py-2 rounded-md font-medium text-sm shadow-md">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;