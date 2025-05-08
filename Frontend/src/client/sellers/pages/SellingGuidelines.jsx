import React from 'react';
import SellerLayout from '../components/SellerLayout';

const SellingGuideline = () => {
  return (
    <SellerLayout>
      <div className="min-h-[calc(100vh-4rem)] w-full p-8 bg-gray-50 text-gray-800">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <p className="font-[Montserrat] text-xl left-5 font-bold text-[#003566] pt-2 pb-2 relative lg:left-33 lg:text-3xl">
                Selling Guidelines
            </p>
          <section className="mb-6">
            <p className="text-gray-700">
              To ensure a smooth experience for both sellers and buyers, please follow these guidelines when listing a phone on our platform.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Device Eligibility</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>The phone must be fully functional and reset to factory settings.</li>
              <li>No outstanding payments or carrier locks should exist.</li>
              <li>It should not be blacklisted or reported as stolen.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">3. How to Check IMEI</h2>
            <p className="text-gray-700 mb-2">The IMEI (International Mobile Equipment Identity) is a unique identifier for your phone.</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Dial <code className="bg-gray-100 px-1 rounded">*#06#</code> to display the IMEI number.</li>
              <li>Check it on the box or the back of the device.</li>
              <li>You can verify the IMEI at <a href="https://www.imei.info/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://www.imei.info/</a>.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Creating a Listing</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Go to <strong>“List a Phone”</strong> from your dashboard.</li>
              <li>Enter accurate phone details including brand, model, IMEI, and condition.</li>
              <li>Upload clear images showing the actual product.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Communication & Dispatch</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Respond promptly to buyer inquiries.</li>
              <li>Pack the phone securely and ship via a reliable courier.</li>
              <li>Update order status upon dispatch.</li>
            </ul>
          </section>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellingGuideline;
