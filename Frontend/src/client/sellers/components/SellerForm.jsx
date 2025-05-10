import React, { useState, useEffect } from "react";
import { UploadImage } from "./imageUpload"; 

export const SellerForm = () => {
    // All your existing state and effect hooks remain exactly the same
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
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/product/brands");
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

    useEffect(() => {
        const fetchModels = async () => {
            if (selectedBrand) {
                try {
                    const response = await fetch(`http://localhost:5000/api/product/models/${selectedBrand}`);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setModels(data);
                    } else {
                        setModels([]);
                        console.error("Models API did not return an array", data);
                    }
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

    useEffect(() => {
        const fetchPhoneDetails = async () => {
            if (selectedBrand && selectedModel) {
                try {
                    setError(null);
                    const response = await fetch(`http://localhost:5000/api/product/details/${selectedBrand}/${selectedModel}`);
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
                    } else {
                        console.error("Error fetching phone details:", data.error);
                    }
                } catch (error) {
                    console.error("Failed to fetch phone details:", error);
                    setError("Failed to load default phone details.");
                }
            }
        };
        fetchPhoneDetails();
    }, [selectedModel, selectedBrand]);

    // Keep all your handler functions exactly the same
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
            console.error("handleImagesChange did NOT receive an array!", files);
            setSelectedImages([]);
        }
        setError(null);
        setSuccessMessage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
    
        if (!selectedBrand || !selectedModel || !phoneDetails.price || !phoneDetails.imei || !phoneDetails.color || selectedImages.length === 0) {
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
    
        if (!Array.isArray(selectedImages)) {
             console.error("CRITICAL: selectedImages is not an array just before sending!", selectedImages);
             setError("An internal error occurred with image handling. Please refresh and try again.");
             setIsSubmitting(false);
             return;
        }
        selectedImages.forEach((file) => {
            formData.append('images', file);
        });
    
        const token = localStorage.getItem('token');
    
        if (!token) {
            setError("Authentication error: You might need to log in again.");
            setIsSubmitting(false);
            return;
        }
    
        try {
    const response = await fetch("http://localhost:5000/api/seller/upload", {
      method: "POST",
      credentials: "include", // For cookies
      body: formData
    });
    
            const data = await response.json();
    
            if (response.ok) {
                setSuccessMessage(data.message || "Phone uploaded successfully!");
                console.log("Upload successful:", data);
            } else {
                 if (response.status === 401) {
                     setError(data.message || "Authentication failed. Please log in again.");
                 } else {
                     setError(data.message || `Upload failed: ${response.statusText}`);
                 }
                console.error("Upload failed:", data);
            }
        } catch (err) {
            setError("An error occurred during submission. Check connection.");
            console.error("Error submitting form:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-screen mx-auto">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {/* Form Header */}
                    <div className="px-6 py-5 border-b border-gray-200 bg-[#FF9F1C]">
                        <h2 className="text-xl font-bold text-white">List Phone for Sale</h2>
                    </div>

                    {/* Status Messages */}
                    <div className="px-6 pt-4">
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
                                <p>{error}</p>
                            </div>
                        )}
                        {successMessage && (
                            <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700">
                                <p>{successMessage}</p>
                            </div>
                        )}
                    </div>

                    {/* Form Content */}
                    <form onSubmit={handleSubmit} className="px-6 py-4">
                        {/* Image Upload Section */}
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload Images <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 border-2 border-dashed border-gray-300 rounded-md px-6 pt-5 pb-6 flex justify-center">
                                <UploadImage onImagesChange={handleImagesChange} />
                            </div>
                            {selectedImages.length > 0 && (
                                <p className="mt-2 text-sm text-gray-500">
                                    {selectedImages.length} image(s) selected
                                </p>
                            )}
                        </div>

                        {/* Brand and Model Selection */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Brand <span className="text-red-500">*</span>
                                </label>
                                <select
                                    className="mt-1 block w-full text-black pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF9F1C] focus:border-[#FF9F1C] sm:text-sm rounded-md"
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Model <span className="text-red-500">*</span>
                                </label>
                                <select
                                    className="mt-1 block text-black w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF9F1C] focus:border-[#FF9F1C] sm:text-sm rounded-md disabled:opacity-50"
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

                        {/* Phone Details */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            {/* Required Fields */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Price (Rs.) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={phoneDetails.price}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full text-black shadow-sm sm:text-sm border border-gray-300 rounded-md focus:ring-[#FF9F1C] focus:border-[#FF9F1C] p-2"
                                    placeholder="Enter price"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    IMEI Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="imei"
                                    value={phoneDetails.imei}
                                    onChange={handleInputChange}
                                    className="mt-1 block text-black w-full shadow-sm sm:text-sm border border-gray-300 rounded-md focus:ring-[#FF9F1C] focus:border-[#FF9F1C] p-2"
                                    placeholder="Enter IMEI number"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Color <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="color"
                                    value={phoneDetails.color}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full shadow-sm text-black sm:text-sm border border-gray-300 rounded-md focus:ring-[#FF9F1C] focus:border-[#FF9F1C] p-2"
                                    placeholder="Enter color"
                                    required
                                />
                            </div>

                            {/* Optional Fields */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Storage
                                </label>
                                <input
                                    type="text"
                                    name="storage"
                                    value={phoneDetails.storage}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full text-black shadow-sm sm:text-sm border border-gray-300 rounded-md focus:ring-[#FF9F1C] focus:border-[#FF9F1C] p-2"
                                    placeholder="e.g. 128GB"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    RAM
                                </label>
                                <input
                                    type="text"
                                    name="ram"
                                    value={phoneDetails.ram}
                                    onChange={handleInputChange}
                                    className="mt-1 text-black block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md focus:ring-[#FF9F1C] focus:border-[#FF9F1C] p-2"
                                    placeholder="e.g. 8GB"
                                />
                            </div>

                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 pb-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#FF9F1C] to-[#FF8F00] hover:from-[#FF8F00] hover:to-[#FF7F00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9F1C] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    "Submit to Verify"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};