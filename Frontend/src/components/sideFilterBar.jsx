import React, { useState, useEffect } from 'react';

// Accept setFilters and allProducts as props from CatalogPage
export const SideFilterBar = ({ setFilters, allProducts }) => {
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(false);

    // Use state to manage filter values *locally* in the filter bar
    const [checkedBrands, setCheckedBrands] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [brands, setBrands] = useState([]); // State for available brands

    // --- REMOVE THE INDEPENDENT FETCHING OF PRODUCTS ---
    // useEffect(() => {
    //     const fetchProducts = async () => { /* ... */ };
    //     fetchProducts();
    // }, []);
    // --- END REMOVE ---

    // Effect to populate brands when allProducts prop changes
    useEffect(() => {
        if (Array.isArray(allProducts)) {
             const uniqueBrands = [...new Set(allProducts.map(product => product.phone_brand))];
             setBrands(uniqueBrands);
        }
    }, [allProducts]); // Dependency on allProducts prop

    const toggleCatalog = () => setIsCatalogOpen(!isCatalogOpen);
    const toggleBrand = () => setIsBrandOpen(!isBrandOpen);
    const togglePriceRange = () => setIsPriceRangeOpen(!isPriceRangeOpen);

    const handleBrandCheckboxChange = (event, brand) => {
        if (event.target.checked) {
            setCheckedBrands([...checkedBrands, brand]);
        } else {
            setCheckedBrands(checkedBrands.filter(item => item !== brand));
        }
    };

     const handleMinPriceChange = (e) => {
        const value = e.target.value;
        // Allow empty string or numbers
        if (value === '' || /^\d+$/.test(value)) {
             setMinPrice(value);
        }
    };

    const handleMaxPriceChange = (e) => {
        const value = e.target.value;
         // Allow empty string or numbers
         if (value === '' || /^\d+$/.test(value)) {
             setMaxPrice(value);
         }
    };


    // --- THIS IS THE KEY CHANGE ---
    const handleApplyFilters = () => {
        console.log("Applying Filters:", { brands: checkedBrands, minPrice, maxPrice });

        // Call the setFilters prop passed from CatalogPage
        // Pass the current state of the local filters
        setFilters({
            brands: checkedBrands,
            minPrice: minPrice === '' ? null : parseFloat(minPrice), // Convert to number or null
            maxPrice: maxPrice === '' ? null : parseFloat(maxPrice), // Convert to number or null
        });
    };
    // --- END KEY CHANGE ---


    // The render logic remains mostly the same,
    // but remove the error and loading state from this component's display
    // as it should be handled by the parent (CatalogPage) if needed.
    return (
        <div className='w-80 p-4 absolute top-10 z-100'>
            {/* ... your existing text elements ... */}
             <p className='font-bold font-[Merriweather] text-lg text-[rgba(0,0,0,0.7)]'>
                Rephone/ <span className='text-[#000000]'>Catalog</span>
            </p>
            <p className='mt-2 font-extrabold font-[Montserrat] text-3xl text-[#000000]'>Catalog</p>

            <div className="mt-2">
                <p
                    onClick={toggleCatalog}
                    className="gap-4 text-[#000000] font-[Montserrat] text-xl font-bold cursor-pointer flex"
                >
                    Category <span><img className='w-4 mt-2' src={isCatalogOpen ? '/down_arrow.svg' : '/right_arrow.svg'} alt="" /></span>
                </p>

                {isCatalogOpen && (
                    <div>
                        {/* Brand Filter */}
                        <p
                            onClick={toggleBrand}
                            className="mt-2 ml-5 gap-4 text-[#000000] font-[Merriweather] text-md font-md cursor-pointer flex"
                        >
                            By Brand <span><img className='w-4 mt-1' src={isBrandOpen ? '/down_arrow.svg' : '/right_arrow.svg'} alt="" /></span>
                        </p>
                        {isBrandOpen && (
                             // Map over the 'brands' state derived from props
                            <div className="ml-7 mt-2 flex flex-col space-y-2">
                                {brands.map((brand, index) => (
                                    <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={checkedBrands.includes(brand)}
                                            onChange={(e) => handleBrandCheckboxChange(e, brand)}
                                            className="w-5 h-5 border-2 border-[#003566] rounded-none appearance-none checked:bg-[#003566]"
                                        />
                                        <span className="text-lg font-thin font-[Merriweather] text-[rgba(0,0,0,0.8)]">{brand}</span>
                                    </label>
                                ))}
                            </div>
                        )}

                        <img className='mt-2' src="/line_break.svg" alt="" />

                        {/* Price Filter */}
                        <p
                            onClick={togglePriceRange}
                            className="mt-2 ml-5 gap-4 text-[#000000] font-[Merriweather] text-md font-md cursor-pointer flex"
                        >
                            By Range <span><img className='w-4 mt-1' src={isPriceRangeOpen ? '/down_arrow.svg' : '/right_arrow.svg'} alt="" /></span>
                        </p>
                        {isPriceRangeOpen && (
                            <div className="ml-7 mt-2 flex flex-row space-x-2">
                                <input
                                    className="font-medium font-[Montserrat] w-20 h-10 px-2 border border-[#2B2A2A]/50"
                                    type="text"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={handleMinPriceChange}
                                />
                                <input
                                    className="font-medium font-[Montserrat] w-20 h-10 px-2 border border-[#2B2A2A]/50"
                                    type="text"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={handleMaxPriceChange}
                                />
                            </div>
                        )}

                        <img className='mt-2' src="/line_break.svg" alt="" />
                    </div>
                )}
            </div>

            <button
                style={{ backgroundColor: '#003566' }}
                className='w-25 text-[#FFFFFF] text-medium text-lg rounded-md mt-5 px-4 py-2'
                onClick={handleApplyFilters} // Call the function that updates parent state
            >
                Apply
            </button>
        </div>
    );
};