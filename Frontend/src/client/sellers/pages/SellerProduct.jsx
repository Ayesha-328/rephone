import React, { useEffect, useState } from 'react';
import { useSellerAuth } from '../context/SellerAuthContext';
import SellerLayout from '../components/SellerLayout';

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
    <div className="bg-[lightgray]/30 p-4 rounded-lg backdrop-blur-sm border border-white/10">
      <div className="flex items-center gap-4">
        {images && images.length > 0 && (
          <img 
            src={images[0]}
            alt={product.phone_model || 'Product Image'}
            className="w-20 h-20 object-cover rounded"
          />
        )}
        <div>
          <h3 className="font-semibold text-black">{product.phone_model || 'Model Not Provided'}</h3>
          <p className="text-black">${product.price}</p>
          <p className="text-black text-sm">Status: {product.status}</p>
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
  }, [seller]);  // Don't include `products` in deps to avoid unnecessary re-renders


  if (isLoading || productsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-black">Loading products...</div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-black">No products listed yet.</div>
      </div>
    );
  }

  return (
    <SellerLayout>
      <div className="min-h-[calc(100vh-4rem)] w-full p-6 text-black">
        <div className="grid gap-6">
          <h1 className="text-3xl font-bold mb-4">My Listed Products</h1>
          <div className="grid gap-6 lg:grid-cols-3">
            {products.map(product => (
              <ProductCard key={product.productid} product={product} />
            ))}
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerProduct;
