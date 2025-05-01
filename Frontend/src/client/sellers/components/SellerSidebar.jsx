import React from 'react';
import { useSellerAuth } from '../context/SellerAuthContext';

const SellerSidebar = () => {
  const { seller } = useSellerAuth();

  const hexToImage = (hex) => {
    if (!hex) return null;
    return `data:image/jpeg;base64,${hex}`;
  };

  return (
    <div className="w-80 bg-white/10 p-6 rounded-lg backdrop-blur-sm h-fit">
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#FF9F1C]">
          {seller?.profilePic && (
            <img 
              src={hexToImage(seller.profilePic)} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">{seller?.name}</h1>
          <p className="text-gray-300">{seller?.email}</p>
          <p className="text-gray-300">{seller?.phoneNumber}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white/5 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">Email:</span> {seller?.email}</p>
            <p><span className="font-semibold">Phone:</span> {seller?.phoneNumber}</p>
          </div>
        </div>

        <div className="bg-white/5 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Address</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">City:</span> {seller?.city}</p>
            <p><span className="font-semibold">Area:</span> {seller?.area}</p>
            <p><span className="font-semibold">Street:</span> {seller?.street}</p>
            <p><span className="font-semibold">House Number:</span> {seller?.houseNumber}</p>
            <p><span className="font-semibold">Landmark:</span> {seller?.nearestLandmark}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSidebar; 