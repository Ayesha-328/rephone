import React from 'react';
import SellerLayout from '../components/SellerLayout';
import { FaMobileAlt, FaShieldAlt, FaInfoCircle, FaClipboardList, FaShippingFast } from 'react-icons/fa';

const SellingGuideline = () => {
  return (
    <SellerLayout>
      <div className="min-h-[calc(100vh-4rem)] w-full p-6 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
          {/* Header Section */}
          <div className=" mb-10">
            <h1 className="text-3xl font-bold text-[#003566] mb-3">Selling Guidelines</h1>
            <p className="text-gray-600">
              Follow these best practices to ensure successful transactions on our platform
            </p>
          </div>

          {/* Guidelines Container */}
          <div className="space-y-8">
            {/* Device Eligibility Section */}
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaMobileAlt className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Device Eligibility</h2>
                  <p className="text-gray-600 mt-1">
                    Requirements for phones listed on our platform
                  </p>
                </div>
              </div>
              <ul className="space-y-3 pl-4">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">Fully functional and factory reset</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">No carrier locks or outstanding payments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">Not blacklisted or reported stolen</span>
                </li>
              </ul>
            </div>

            {/* IMEI Verification Section */}
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaShieldAlt className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">IMEI Verification</h2>
                  <p className="text-gray-600 mt-1">
                    How to find and verify your device's IMEI number
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-2">Finding Your IMEI</h3>
                  <ul className="space-y-2 pl-4">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">
                        Dial <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">*#06#</code>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">Check the original packaging or device back</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-2">Verification Resources</h3>
                  <p className="text-gray-700 mb-2">
                    Verify your IMEI at trusted sources:
                  </p>
                  <a
                    href="https://www.imei.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <FaInfoCircle className="mr-2" />
                    IMEI.info - Comprehensive device checker
                  </a>
                </div>
              </div>
            </div>

            {/* Listing Process Section */}
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaClipboardList className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Creating Your Listing</h2>
                  <p className="text-gray-600 mt-1">
                    Steps to create an effective phone listing
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-2">Getting Started</h3>
                  <ul className="space-y-2 pl-4">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">Navigate to "List a Phone" in your dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">Select the correct brand and model</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-2">Listing Details</h3>
                  <ul className="space-y-2 pl-4">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">Provide accurate condition assessment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">Upload clear photos from multiple angles</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Transaction Process Section */}
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaShippingFast className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Transaction Process</h2>
                  <p className="text-gray-600 mt-1">
                    What to expect after your listing goes live
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-2">Communication</h3>
                  <ul className="space-y-2 pl-4">
                    
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">Be transparent about device condition</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-2">Shipping & Delivery</h3>
                  <ul className="space-y-2 pl-4">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">Use protective packaging materials</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">Ship within 2 business days of sale</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">Provide tracking information promptly</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellingGuideline;