
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCatalog = ({ products, className }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return <div className="text-center mt-10">No products found.</div>;
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-18 gap-y-10 pl-90 pt-10">
        {products.map((product) => (
          <Link to={`/product/${product.productid}`} key={product.productid}>
            <div className="border p-2 rounded-3xl shadow-md text-center w-58 h-75 bg-[#003566]">
              {product.phone_model && (
                <p className="mt-1 mb-1 text-white font-[Montserrat] text-lg font-semibold text-md">{product.phone_model}</p>
              )}
              {/* {product.phoneImage && product.phoneImage[0] ? (
                <img
                  src={`data:image/jpeg;base64,${product.phoneImage[0]}`}
                  alt={`Product image ${product.productid}`}
                  className="w-43 h-55 mx-auto rounded-3xl border-3 border-[#FFFFFF]"
                />
              ) : (
                <div className="w-43 h-55 mx-auto flex items-center justify-center bg-gray-200 rounded-3xl border-3 border-[#FFFFFF] text-gray-600 text-sm">
                  No Image Available
                </div>
              )} */}
               {product.phoneImage && product.phoneImage[0] ? (
               <img
               // Use the URL directly as the src
               src={product.phoneImage[0]}
               alt={`Product image ${product.phone_model || product.productid}`} // Use phone_model for alt text if available
               className="w-43 h-55 mx-auto rounded-3xl border-3 border-[#FFFFFF]"
             />
              ) : (
                <div className="w-43 h-55 mx-auto flex items-center justify-center bg-gray-200 rounded-3xl border-3 border-[#FFFFFF] text-gray-600 text-sm">
                  No Image Available
                </div>
              )}
              {typeof product.price === 'number' && (
                <p className="text-lg font-medium text-[#FFFFFF] font-[Merriweather] text-right mr-4 mt-2">
                  ${product.price}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
