
import React, { useState, useEffect } from "react";
import { UploadImage } from "./imageUpload"; 

export const SellerForm = () => {
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");
    const [phoneDetails, setPhoneDetails] = useState({
        price: "",
        imei: "", // Added IMEI
        color: "", // Added Color
        storage: "",
        ram: "",
        launchDate: "",
        dimensions: "",
        displayResolution: "",
        os: "",
        battery: "",
        resolution: ""
    });
    const [selectedImages, setSelectedImages] = useState([]); // State for image files
    const [isSubmitting, setIsSubmitting] = useState(false); // Optional: for loading state
    const [error, setError] = useState(null); // Optional: for error messages
    const [successMessage, setSuccessMessage] = useState(null); // Optional: for success messages

    // --- Existing useEffect hooks for brands, models, details ---
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
        // This useEffect fetches *default* details. The user can override them.
        const fetchPhoneDetails = async () => {
            if (selectedBrand && selectedModel) {
                try {
                    setError(null); // Clear previous errors
                    const response = await fetch(`http://localhost:5000/api/product/details/${selectedBrand}/${selectedModel}`);
                    const data = await response.json();
                    if (response.ok) {
                        setPhoneDetails(prevDetails => ({
                            ...prevDetails, // Keep existing user input like price, imei, color
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
                        // Optionally clear fields if fetch fails, or keep existing
                        // setPhoneDetails(prevDetails => ({
                        //     ...prevDetails, // Keep user input
                        //     storage: "", ram: "", launchDate: "", dimensions: "",
                        //     displayResolution: "", os: "", battery: "", resolution: ""
                        // }));
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
        console.log('Received in handleImagesChange:', files);
        console.log('Is it an array?', Array.isArray(files));

        if (Array.isArray(files)) {
            setSelectedImages(files);
        } else {
            console.error("handleImagesChange did NOT receive an array!", files);
            setSelectedImages([]); // Fallback
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
    
        // --- Check if selectedImages is an array before looping ---
        if (!Array.isArray(selectedImages)) {
             console.error("CRITICAL: selectedImages is not an array just before sending!", selectedImages);
             setError("An internal error occurred with image handling. Please refresh and try again.");
             setIsSubmitting(false);
             return;
        }
        selectedImages.forEach((file) => {
            formData.append('images', file);
        });
    
        // --- GET THE TOKEN ---
        const token = localStorage.getItem('token'); // Or however you store your token
    
        // --- CHECK FOR TOKEN ---
        if (!token) {
            setError("Authentication error: You might need to log in again.");
            setIsSubmitting(false);
            return;
        }
    
        try {
            const response = await fetch("http://localhost:5000/api/product/upload-phone", {
                method: 'POST',
                // --- ADD AUTHORIZATION HEADER ---
                headers: {
                    'Authorization': `Bearer ${token}`
                    // No 'Content-Type' needed for FormData, browser sets it
                },
                body: formData,
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setSuccessMessage(data.message || "Phone uploaded successfully!");
                console.log("Upload successful:", data);
                // Optionally reset form
            } else {
                 // Check specifically for 401 again, might indicate expired token
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
        <form onSubmit={handleSubmit} className="bg-[#FFFFFF] justify-center items-center min-h-42 p-4 pr-10 relative left-5 shadow-lg pt-2 mt-10 mb-10 lg:min-h-100 lg:left-1/2">
            <p className="font-[Montserrat] text-xl left-5 font-bold text-[#003566] pt-2 pb-2 relative lg:left-33 lg:text-3xl">
                List Your Phone for Sale
            </p>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

            {/* --- CORRECTED Image Upload Section --- */}
            <div className="flex flex-col border-t-1 border-[#2B2A2A]/50 pt-4 pb-4"> {/* Maybe add pt-4 pb-4 */}
                <p className="text-sm text-[#003566] font-medium font-[Merriweather] mb-2 ml-6 lg:text-md">
                    Upload Images <span className="text-[#FF0000]">*</span>
                </p>
                {/* Container for the UploadImage component */}
                <div className="bg-[#FFFFFF] w-full px-4 flex items-center justify-center text-center border-1 border-[#2B2A2A]/50 ml-0 lg:ml-4 lg:w-[calc(100%-2rem)]">
                     {/* Use your UploadImage component here */}
                     {/* Pass the handler to the 'onImagesChange' prop */}
                     <UploadImage onImagesChange={handleImagesChange} />
                </div>
                 {/* Display selected image count below the component */}
                 {selectedImages.length > 0 && (
                        <p className="text-xs text-gray-600 mt-2 ml-6">
                            {selectedImages.length} image(s) ready for upload.
                        </p>
                    )}
            </div>
            {/* --- End of Corrected Section --- */}


            {/* ... (rest of your form elements: Brand, Model, Inputs, Button) ... */}
             {/* Brand and Model Selection */}
            <div className="lg:flex">
                {/* Brand */}
                <div className="mt-5">
                    <p className="text-sm lg:text-md text-[#003566] font-medium font-[Merriweather] mb-2 ml-7">
                        Brand <span className="text-[#FF0000]">*</span>
                    </p>
                    <div className="bg-[#FFFFFF] w-70 h-15 flex items-center justify-center text-center border-1 border-[#2B2A2A]/50 ml-5">
                        <select
                            className="text-md text-[rgba(0,0,0,0.5)] font-medium font-[Montserrat] w-60 h-10 ml-5 outline-none border-none focus:ring-0"
                            value={selectedBrand}
                            onChange={(e) => {
                                setSelectedBrand(e.target.value);
                                setSelectedModel(""); // Reset model when brand changes
                                setPhoneDetails(prev => ({ price: prev.price, imei: prev.imei, color: prev.color, storage: "", ram: "", launchDate: "", dimensions: "", displayResolution: "", os: "", battery: "", resolution: "" }));
                                setError(null); // Clear error
                                setSuccessMessage(null);
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
                </div>

                {/* Model */}
                <div className="-ml-1 mt-4 lg:ml-2">
                    <p className="text-md text-[#003566] font-medium font-[Merriweather] mb-2 ml-8">
                        Model <span className="text-[#FF0000]">*</span>
                    </p>
                    <div className="bg-[#FFFFFF] w-70 h-15 flex items-center justify-center text-center border-1 border-[#2B2A2A]/50 ml-6">
                        <select
                            className="text-md text-[rgba(0,0,0,0.5)] font-medium font-[Montserrat] w-60 h-10 ml-5 outline-none border-none focus:ring-0"
                            value={selectedModel}
                            onChange={(e) => {
                                setSelectedModel(e.target.value);
                                setError(null); // Clear error
                                setSuccessMessage(null);
                            }}
                            required
                            disabled={!selectedBrand || models.length === 0} // Disable if no brand or models
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
            </div>

            {/* Other Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-0">
                {[
                    { label: "Price (USD)", name: "price", placeholder: "Enter Price in USD", type: "number", required: true },
                    { label: "IMEI no", name: "imei", placeholder: "Enter IMEI no", type: "text", required: true },
                    { label: "Color", name: "color", placeholder: "Enter Color of Your Phone", type: "text", required: true },
                    { label: "Storage", name: "storage", placeholder: "Storage (e.g., 128GB)", type: "text", required: false },
                    { label: "RAM", name: "ram", placeholder: "RAM (e.g., 8GB)", type: "text", required: false },
                    // ... other optional fields ...
                ].map((item, index) => (
                     (item.required || ['storage', 'ram'].includes(item.name)) &&
                    <div key={index} className="lg:w-70 mt-5 flex flex-col">
                         <p className="text-md text-[#003566] font-medium font-[Merriweather] mb-2 ml-7">
                            {item.label} {item.required && <span className="text-[#FF0000]">*</span>}
                        </p>
                        <div className="bg-[#FFFFFF] w-70 h-15 flex items-center justify-center text-center border-1 border-[#2B2A2A]/50 ml-5">
                            <input
                                className="font-medium font-[Montserrat] w-60 h-10 ml-5 outline-none border-none focus:ring-0"
                                type={item.type || "text"}
                                name={item.name}
                                placeholder={item.placeholder}
                                value={phoneDetails[item.name] || ''}
                                onChange={handleInputChange}
                                required={item.required}
                                step={item.type === "number" ? "0.01" : undefined}
                            />
                        </div>
                    </div>
                ))}
            </div>

             <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#FF9F1C] via-[#FF8F00] to-[#FF7F00] hover:bg-gradient-to-br text-[#FFFFFF] text-xl lg:text-2xl font-bold font-[Merriweather] text-center w-70 h-12 lg:w-150 lg:h-15 ml-4 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Submitting...' : 'Submit to Verify'}
            </button>
        </form>
    );
};