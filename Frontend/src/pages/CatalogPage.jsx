import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import { SideFilterBar } from '../components/sideFilterBar';
import ProductCatalog from '../components/catalogComponent';

const CatalogPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    brands: [],
    minPrice: null,
    maxPrice: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:5000/api/product/verified');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format: expected an array");
        }

        // Ensure products have required fields
        const validatedProducts = data.map(product => ({
          ...product,
          phone_brand: product.phone_brand || 'Unknown',
          price: typeof product.price === 'number' ? product.price : 0
        }));

        setAllProducts(validatedProducts);
        setFilteredProducts(validatedProducts);
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError("Failed to load products. Please try again later.");
        setAllProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filter logic
  useEffect(() => {
    if (!Array.isArray(allProducts)) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [...allProducts];

    // Apply brand filter if any brands are selected
    if (filters.brands?.length > 0) {
      filtered = filtered.filter(product => 
        product.phone_brand && filters.brands.includes(product.phone_brand)
      );
    }

    // Apply price filters
    if (typeof filters.minPrice === 'number') {
      filtered = filtered.filter(product => 
        typeof product.price === 'number' && product.price >= filters.minPrice
      );
    }

    if (typeof filters.maxPrice === 'number') {
      filtered = filtered.filter(product => 
        typeof product.price === 'number' && product.price <= filters.maxPrice
      );
    }

    setFilteredProducts(filtered);
  }, [filters, allProducts]);

  return (
    <>
      <Header />
      <div className="bg-[#002241] text-gray-900 pt-24 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">Product Catalog</h1>
          {loading ? (
            <div className="flex justify-center items-center h-[60vh] text-xl font-semibold animate-pulse text-white">
              Loading products...
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-[60vh] text-xl font-semibold text-red-400">
              {error}
            </div>
          ) : (
            
            <div className="flex flex-col lg:flex-row gap-8 px-3 lg:px-1 py-10">
              
              <SideFilterBar 
                allProducts={allProducts} 
                setFilters={setFilters} 
              />
              <section className="w-full lg:w-3/4">
                {filteredProducts.length > 0 ? (
                  <ProductCatalog products={filteredProducts} />
                ) : (
                  <div className="flex justify-center items-center h-64 text-lg text-white">
                    No products match your filters. Try adjusting your criteria.
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CatalogPage;