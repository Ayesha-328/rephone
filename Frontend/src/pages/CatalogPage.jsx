import React, { useEffect, useState } from 'react';
import { SideFilterBar } from '../components/sideFilterBar';
import ProductCatalog from '../components/catalogComponent';

const CatalogPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    brands: [],
    minPrice: null, // Add initial state for price filters
    maxPrice: null, // Add initial state for price filters
  });
  const [loading, setLoading] = useState(true); // Add loading state for fetching
  const [error, setError] = useState(null); // Add error state for fetching

  // Fetch all products once
  useEffect(() => {
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
      try {
        const res = await fetch('http://localhost:5000/api/product/verified');
         if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
          }
        const data = await res.json();
        console.log("Fetched Products:", data);

        if (Array.isArray(data)) {
          setAllProducts(data);
          setFilteredProducts(data); // Initialize filtered products with all products
        } else {
             setError("Invalid data format from API.");
             setAllProducts([]);
             setFilteredProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError('Failed to load products. Please try again.');
         setAllProducts([]);
         setFilteredProducts([]);
      } finally {
           setLoading(false);
      }
    };
    fetchProducts();
  }, []); // Empty dependency array means this runs only once on mount

  // Apply filters when filter state or allProducts changes
  useEffect(() => {
    console.log("Applying Filters in CatalogPage:", filters);
    let filtered = allProducts; // Start with all products

    // Apply Brand Filter
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(product =>
        filters.brands.includes(product.phone_brand)
      );
    }

    // Apply Price Filter
    if (filters.minPrice !== null) {
        filtered = filtered.filter(product =>
            typeof product.price === 'number' && product.price >= filters.minPrice
        );
    }
     if (filters.maxPrice !== null) {
        filtered = filtered.filter(product =>
             typeof product.price === 'number' && product.price <= filters.maxPrice
        );
    }


    setFilteredProducts(filtered);
  }, [filters, allProducts]); // Re-run whenever filters or the original product list changes

  if (loading) {
      return <div className="text-center mt-20 ml-90">Loading products...</div>;
  }

  if (error) {
      return <div className="text-center mt-20 ml-90 text-red-600">Error: {error}</div>;
  }


  return (
    <div className="flex">
        {/* Pass the setFilters function and allProducts array down */}
      <SideFilterBar allProducts={allProducts} setFilters={setFilters} />
        {/* Pass the filteredProducts to the catalog component */}
      <ProductCatalog products={filteredProducts} className="relative mt-10 w-351" />
    </div>
  );
};

export default CatalogPage;