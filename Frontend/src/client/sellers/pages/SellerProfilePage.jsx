import React, { useState, useEffect } from 'react';
import { useSellerAuth } from '../context/SellerAuthContext';
import SellerLayout from '../components/SellerLayout';

const SellerProfilePage = () => {
  const { seller, updateSellerProfile } = useSellerAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    city: '',
    area: '',
    street: '',
    houseNumber: '',
    nearestLandmark: '',
    profilePic: ''
  });

  useEffect(() => {
    if (seller) {
      setFormData({
        name: seller.name || '',
        email: seller.email || '',
        phoneNumber: seller.phoneNumber || '',
        city: seller.city || '',
        area: seller.area || '',
        street: seller.street || '',
        houseNumber: seller.houseNumber || '',
        nearestLandmark: seller.nearestLandmark || '',
        profilePic: seller.profilePic || ''
      });
    }
  }, [seller]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      await updateSellerProfile(submitData);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
      console.error('Error updating profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (seller) {
      setFormData({
        name: seller.name || '',
        email: seller.email || '',
        phoneNumber: seller.phoneNumber || '',
        city: seller.city || '',
        area: seller.area || '',
        street: seller.street || '',
        houseNumber: seller.houseNumber || '',
        nearestLandmark: seller.nearestLandmark || '',
        profilePic: seller.profilePic || ''
      });
    }
    setIsEditing(false);
    setError(null);
  };

  return (
    <SellerLayout>
      <div className="min-h-[calc(100vh-4rem)] w-full p-6 bg-gray-50">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Settings</h1>
              <p className="text-gray-600">View and manage your profile information</p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-[#FF9F1C] hover:bg-[#f39200] text-black font-semibold py-2.5 px-5 rounded-lg shadow-lg transition-all duration-300"
              >
                Edit Profile
              </button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Profile Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#FF9F1C] shadow-lg">
                {seller?.profilePic ? (
                  <img 
                    src={`data:image/jpeg;base64,${seller.profilePic}`}
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-4xl text-gray-500">
                      {seller?.name?.charAt(0)?.toUpperCase() || '?'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-[#FF9F1C] focus:border-[#FF9F1C] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-[#FF9F1C] focus:border-[#FF9F1C] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-[#FF9F1C] focus:border-[#FF9F1C] disabled:bg-gray-100"
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Address Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-[#FF9F1C] focus:border-[#FF9F1C] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-[#FF9F1C] focus:border-[#FF9F1C] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-[#FF9F1C] focus:border-[#FF9F1C] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">House Number</label>
                    <input
                      type="text"
                      name="houseNumber"
                      value={formData.houseNumber}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-[#FF9F1C] focus:border-[#FF9F1C] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nearest Landmark</label>
                    <input
                      type="text"
                      name="nearestLandmark"
                      value={formData.nearestLandmark}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-[#FF9F1C] focus:border-[#FF9F1C] disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-4 mt-8">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 bg-[#FF9F1C] hover:bg-[#f39200] text-black font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerProfilePage;