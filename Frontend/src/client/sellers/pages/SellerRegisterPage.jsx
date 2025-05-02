import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../../components/Footer';

const SellerRegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    sellerType: 'seller', // default type that will be sent to API
    city: '',
    area: '',
    street: '',
    houseNumber: '',
    nearestLandmark: '',
    profilePicture: null
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);  // For handling the upload state

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setUploading(true); // Set uploading state to true when file is selected

        // Create a FormData object
        const formData = new FormData();
        formData.append('profilePic', file);  // Append the image file to the form data

        // Upload image to Cloudinary
        const response = await fetch('http://localhost:5000/api/seller/upload-profile-pic', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const result = await response.json();
        setUploading(false); // Set uploading state to false once upload is done

        if (result.url) {
          setFormData(prev => ({
            ...prev,
            profilePicture: result.url // Store the image URL returned by Cloudinary
          }));

          // Create preview URL
          setPreviewUrl(result.url);
        } else {
          setError('Failed to upload image');
        }
      } catch (err) {
        setUploading(false); // Set uploading state to false if an error occurs
        console.error('Error uploading image:', err);
        setError('Error uploading image. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6 || !/[a-zA-Z]/.test(formData.password)) {
      setError('Password must be at least 6 characters long and contain at least one letter');
      return;
    }

    if (!formData.profilePicture) {
      setError('Profile picture is required');
      return;
    }

    try {
      const submitData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        sellerType: formData.sellerType,
        city: formData.city,
        area: formData.area,
        street: formData.street,
        houseNumber: formData.houseNumber,
        nearestLandmark: formData.nearestLandmark,
        profilePicture: formData.profilePicture
      };

      console.log('Sending data:', submitData); // Debug log

      const response = await fetch('http://localhost:5000/api/seller/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submitData),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response:', textResponse);
        throw new Error('Server returned non-JSON response');
      }

      const data = await response.json();

      if (response.ok) {
        navigate('/seller/login');
      } else {
        console.error('Server error:', data); // Debug log
        setError(data.error || data.errors?.[0]?.msg || 'Registration failed');
      }
    } catch (err) {
      console.error('Error details:', err);
      if (err.message === 'Server returned non-JSON response') {
        setError('Server error. Please try again later.');
      } else {
        setError('Connection error. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-[#003566] text-white p-8 pt-28">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-3xl font-bold mb-6 text-center">Register as a Seller</h1>
            <p className="text-center text-gray-300 mb-6">
              Join Rephone's trusted community of phone sellers
            </p>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-white p-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-white/20 border-2 border-[#FF9F1C] mb-2">
                    {previewUrl ? (
                      <img 
                        src={previewUrl} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <span>No image</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="profilePicture"
                    className="block text-center cursor-pointer text-[#FF9F1C] hover:text-[#f39200]"
                  >
                    Upload Profile Picture
                  </label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  pattern="[0-9]*"
                  className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block mb-2">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="area" className="block mb-2">Area</label>
                  <input
                    type="text"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="street" className="block mb-2">Street</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="houseNumber" className="block mb-2">House Number</label>
                  <input
                    type="text"
                    id="houseNumber"
                    name="houseNumber"
                    value={formData.houseNumber}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="nearestLandmark" className="block mb-2">Nearest Landmark</label>
                  <input
                    type="text"
                    id="nearestLandmark"
                    name="nearestLandmark"
                    value={formData.nearestLandmark}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
                  required
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full p-3 bg-[#FF9F1C] text-black rounded-full hover:bg-[#f39200] transition"
                  disabled={uploading}
                >
                  {uploading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>

            <p className="text-center mt-4 text-gray-300">
              Already have an account? <Link to="/seller/login" className="text-[#FF9F1C] hover:text-[#f39200]">Login here</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerRegisterPage;
