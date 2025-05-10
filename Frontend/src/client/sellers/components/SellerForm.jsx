import React, { useState, useEffect } from "react";
import { UploadImage } from "./imageUpload";
import { useSellerAuth } from '../context/SellerAuthContext';

export const SellerForm = () => {
    const { seller, loading: authLoading, logout } = useSellerAuth();
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");
    const [phoneDetails, setPhoneDetails] = useState({
        price: "",
        imei: "",
        color: "",
        storage: "",
        ram: "",
        launchDate: "",
        dimensions: "",
        displayResolution: "",
        os: "",
        battery: "",
        resolution: ""
    });
    const [selectedImages, setSelectedImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Fetch brands on component mount
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/product/brands", {
                    credentials: 'include'
                });
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setBrands(data);
            } catch (error) {
                console.error("Failed to fetch brands:", error);
                setError("Failed to load brands. Please refresh.");
            }
        };
        fetchBrands();
    }, []);

    // Fetch models when brand is selected
    useEffect(() => {
        const fetchModels = async () => {
            if (selectedBrand) {
                try {
                    const response = await fetch(
                        `http://localhost:5000/api/product/models/${selectedBrand}`,
                        { credentials: 'include' }
                    );
                    if (!response.ok) throw new Error('Network response was not ok');
                    const data = await response.json();
                    setModels(Array.isArray(data) ? data : []);
                } catch (error) {
                    console.error("Failed to fetch models:", error);
                    setModels([]);
                    setError("Failed to load models for the selected brand.");
                }
            } else {
                setModels([]);
            }
        };
        fetchModels();
    }, [selectedBrand]);

    // Fetch phone details when model is selected
    useEffect(() => {
        const fetchPhoneDetails = async () => {
            if (selectedBrand && selectedModel) {
                try {
                    setError(null);
                    const response = await fetch(
                        `http://localhost:5000/api/product/details/${selectedBrand}/${selectedModel}`,
                        { credentials: 'include' }
                    );
                    const data = await response.json();
                    if (response.ok) {
                        setPhoneDetails(prevDetails => ({
                            ...prevDetails,
                            storage: data.storage || prevDetails.storage || "",
                            ram: data.ram || prevDetails.ram || "",
                            launchDate: data.launch_date || prevDetails.launchDate || "",
                            dimensions: data.dimensions || prevDetails.dimensions || "",
                            displayResolution: data.display_resolution || prevDetails.displayResolution || "",
                            os: data.os || prevDetails.os || "",
                            battery: data.battery || prevDetails.battery || "",
                            resolution: data.resolution || prevDetails.resolution || ""
                        }));
                    }
                } catch (error) {
                    console.error("Failed to fetch phone details:", error);
                    setError("Failed to load default phone details.");
                }
            }
        };
        fetchPhoneDetails();
    }, [selectedModel, selectedBrand]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPhoneDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
        setError(null);
        setSuccessMessage(null);
    };

    const handleImagesChange = (files) => {
        if (Array.isArray(files)) {
            setSelectedImages(files);
        } else {
            console.error("handleImagesChange did NOT receive an array!");
            setSelectedImages([]);
        }
        setError(null);
        setSuccessMessage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
    
        if (!selectedBrand || !selectedModel || !phoneDetails.price || 
            !phoneDetails.imei || !phoneDetails.color || selectedImages.length === 0) {
            setError("Please fill in all required fields (*) and upload at least one image.");
            return;
        }
    
        setIsSubmitting(true);
    
        const formData = new FormData();
        formData.append('brand', selectedBrand);
        formData.append('model', selectedModel);
        formData.append('price', phoneDetails.price);
        formData.append('imei', phoneDetails.imei);
        formData.append('color', phoneDetails.color);
        
    
       selectedImages.forEach((file) => {
    formData.append('image', file); 
});
    
        try {
            const response = await fetch("http://localhost:5000/api/product/upload", {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setSuccessMessage(data.message || "Phone uploaded successfully!");
                // Reset form on success
                setSelectedBrand("");
                setSelectedModel("");
                setPhoneDetails({
                    price: "",
                    imei: "",
                    color: "",
                    storage: "",
                    ram: "",
                    launchDate: "",
                    dimensions: "",
                    displayResolution: "",
                    os: "",
                    battery: "",
                    resolution: ""
                });
                setSelectedImages([]);
            } else {
                if (response.status === 401) {
                    setError("Session expired. Please log in again.");
                    logout();
                } else {
                    setError(data.message || `Upload failed: ${response.statusText}`);
                }
            }
        } catch (err) {
            setError("Network error. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (authLoading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    if (!seller) {
        return (
            <div className="text-center py-8">
                <p className="text-lg mb-4">Please log in to access this feature.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white rounded-lg shadow-md p-6 md:p-8"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-[#003566] mb-6">
                    List Your Phone for Sale
                </h2>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                        <p>{error}</p>
                    </div>
                )}
                {successMessage && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
                        <p>{successMessage}</p>
                    </div>
                )}

                {/* Image Upload Section */}
                <div className="mb-8">
                    <label className="block text-sm md:text-md font-medium text-[#003566] mb-2">
                        Upload Images <span className="text-red-500">*</span>
                    </label>
                    <div className="border border-gray-300 text-black rounded-md p-4">
                        <UploadImage onImagesChange={handleImagesChange} />
                    </div>
                    {selectedImages.length > 0 && (
                        <p className="mt-2 text-sm text-gray-600">
                            {selectedImages.length} image(s) ready for upload.
                        </p>
                    )}
                </div>
                
                {/* Brand and Model Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Brand */}
                    <div>
                        <label className="block text-sm md:text-md font-medium text-[#003566] mb-2">
                            Brand <span className="text-red-500">*</span>
                        </label>
                        <select
                            className="w-full p-3 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={selectedBrand}
                            onChange={(e) => {
                                setSelectedBrand(e.target.value);
                                setSelectedModel("");
                                setPhoneDetails(prev => ({ 
                                    ...prev,
                                    storage: "",
                                    ram: "",
                                    launchDate: "",
                                    dimensions: "",
                                    displayResolution: "",
                                    os: "",
                                    battery: "",
                                    resolution: ""
                                }));
                            }}
                            required
                        >
                            <option value="">Select brand</option>
                            {brands.map((brandObj, idx) => (
                                <option key={idx} value={brandObj.brand}>
                                    {brandObj.brand}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Model */}
                    <div>
                        <label className="block text-sm md:text-md font-medium text-[#003566] mb-2">
                            Model <span className="text-red-500">*</span>
                        </label>
                        <select
                            className="w-full p-3 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                            required
                            disabled={!selectedBrand || models.length === 0}
                        >
                            <option value="">Select model</option>
                            {models.map((modelObj, idx) => (
                                <option key={idx} value={modelObj.model}>
                                    {modelObj.model}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Required Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 text-black">
                    {[
                        { label: "Price (Rs.)", name: "price", placeholder: "Enter Price in Rs.", type: "number", required: true },
                        { label: "IMEI no", name: "imei", placeholder: "Enter IMEI no", type: "text", required: true },
                        { label: "Color", name: "color", placeholder: "Enter Color of Your Phone", type: "text", required: true },
                    ].map((item, index) => (
                        <div key={index}>
                            <label className="block text-sm md:text-md font-medium text-[#003566] mb-2">
                                {item.label} {item.required && <span className="text-red-500">*</span>}
                            </label>
                            <input
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                type={item.type}
                                name={item.name}
                                placeholder={item.placeholder}
                                value={phoneDetails[item.name] || ''}
                                onChange={handleInputChange}
                                required={item.required}
                                step={item.type === "number" ? "0.01" : undefined}
                            />
                        </div>
                    ))}
                </div>

                {/* Optional Fields */}
                <h3 className="text-lg font-medium text-gray-700 mb-4">Additional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 text-black">
                    {[
                        { label: "Storage", name: "storage", placeholder: "Storage (e.g., 128GB)", type: "text" },
                        { label: "RAM", name: "ram", placeholder: "RAM (e.g., 8GB)", type: "text" },
                        { label: "Launch Date", name: "launchDate", placeholder: "YYYY-MM-DD", type: "text" },
                        { label: "Dimensions", name: "dimensions", placeholder: "Dimensions (e.g., 160.9 x 77.6 x 8.3 mm)", type: "text" },
                        { label: "Display Resolution", name: "displayResolution", placeholder: "e.g., 1440x3200 pixels", type: "text" },
                        { label: "Operating System", name: "os", placeholder: "e.g., Android 12", type: "text" },
                        { label: "Battery", name: "battery", placeholder: "e.g., 5000 mAh", type: "text" },
                        { label: "Camera Resolution", name: "resolution", placeholder: "e.g., 108 MP", type: "text" },
                    ].map((item, index) => (
                        <div key={index}>
                            <label className="block text-sm md:text-md font-medium text-[#003566] mb-2">
                                {item.label}
                            </label>
                            <input
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                type={item.type}
                                name={item.name}
                                placeholder={item.placeholder}
                                value={phoneDetails[item.name] || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#FF9F1C] via-[#FF8F00] to-[#FF7F00] text-white font-bold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            "Submit to Verify"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};