import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const SideFilterBar = ({ setFilters, allProducts = [] }) => {
  // State for collapsible sections
  const [openSections, setOpenSections] = useState({
    brand: true,
    price: true
  });

  // Filter states
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  
  // Extract unique brands
  const brands = [...new Set(allProducts.map(p => p.phone_brand))].filter(Boolean);

  // Calculate max price on component mount
  useEffect(() => {
    if (allProducts.length > 0) {
      const maxProductPrice = Math.max(...allProducts.map(p => p.price || 0));
      setPriceRange([0, Math.ceil(maxProductPrice * 1.2)]);
    }
  }, [allProducts]);

  // Toggle section collapse
  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle price range change
  const handlePriceChange = (index, value) => {
    const numValue = parseInt(value) || 0;
    const newPriceRange = [...priceRange];
    newPriceRange[index] = numValue;
    
    // Ensure min doesn't exceed max and vice versa
    if (index === 0) {
      newPriceRange[0] = Math.min(numValue, priceRange[1]);
    } else {
      newPriceRange[1] = Math.max(numValue, priceRange[0]);
    }
    
    setPriceRange(newPriceRange);
  };

  // Apply filters
  const handleApplyFilters = () => {
    setFilters({
      brands: checkedBrands,
      minPrice: priceRange[0],
      maxPrice: priceRange[1]
    });
  };

  // Reset filters
  const handleResetFilters = () => {
    setCheckedBrands([]);
    if (allProducts.length > 0) {
      const maxProductPrice = Math.max(...allProducts.map(p => p.price || 0));
      setPriceRange([0, Math.ceil(maxProductPrice * 1.2)]);
    }
    setFilters({});
  };

  return (
    <aside className="w-full lg:w-72 bg-white p-5 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button 
          onClick={handleResetFilters}
          className="text-xs text-[#FF9F1C] hover:text-[#e68a00] font-medium"
        >
          Reset All
        </button>
      </div>

      {/* Brand Filter */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-3"
          onClick={() => toggleSection('brand')}
        >
          <h3 className="text-sm font-medium text-gray-700">Brand</h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transform transition-transform ${openSections.brand ? 'rotate-0' : '-rotate-90'}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {openSections.brand && (
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center space-x-3 py-1">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[#FF9F1C] border-gray-300 rounded focus:ring-[#FF9F1C]"
                  checked={checkedBrands.includes(brand)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheckedBrands([...checkedBrands, brand]);
                    } else {
                      setCheckedBrands(checkedBrands.filter(b => b !== brand));
                    }
                  }}
                />
                <span className="text-sm text-gray-600 capitalize">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-3"
          onClick={() => toggleSection('price')}
        >
          <h3 className="text-sm font-medium text-gray-700">Price Range</h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transform transition-transform ${openSections.price ? 'rotate-0' : '-rotate-90'}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {openSections.price && (
          <div>
            <div className="flex items-center justify-between space-x-4 mb-2">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Min</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-gray-400">Rs.</span>
                  <input
                    type="number"
                    min="0"
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(0, e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-[#FF9F1C] focus:border-[#FF9F1C]"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Max</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-gray-400">Rs.</span>
                  <input
                    type="number"
                    min={priceRange[0]}
                    max={priceRange[1]}
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(1, e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-[#FF9F1C] focus:border-[#FF9F1C]"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 px-2">
              <input
                type="range"
                min="0"
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(0, e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max={priceRange[1]}
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(1, e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-4"
              />
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleApplyFilters}
        className="w-full bg-[#FF9F1C] hover:bg-[#e68a00] text-black border font-medium py-2.5 rounded-md transition duration-200 shadow-sm"
      >
        Apply Filters
      </button>
    </aside>
  );
};

SideFilterBar.propTypes = {
  setFilters: PropTypes.func.isRequired,
  allProducts: PropTypes.arrayOf(PropTypes.shape({
    phone_brand: PropTypes.string,
    price: PropTypes.number,
  }))
};

SideFilterBar.defaultProps = {
  allProducts: []
};