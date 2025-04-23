import React from 'react';
import '../index.css';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-[#003566] text-white p-8 pt-28">
        <div className=" mx-auto">
          <h1 className="text-4xl font-bold mb-12 text-center">About Rephone</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-200">
                At Rephone, we're revolutionizing Pakistan's second-hand phone market by creating a secure 
                and trustworthy platform. Our mission is to protect buyers from fraud while helping sellers 
                get the best value for their genuine devices.
              </p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4">Why Choose Rephone?</h2>
              <ul className="text-gray-200 space-y-2">
                <li>✓ Advanced phone verification system</li>
                <li>✓ Protection against stolen or blacklisted devices</li>
                <li>✓ Secure marketplace environment</li>
                <li>✓ Transparent pricing and transactions</li>
                <li>✓ Dedicated customer support</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4">Our Process</h2>
              <div className="space-y-4 text-gray-200">
                <div className="flex items-start space-x-3">
                  <span className="text-[#FF9F1C] font-bold">1.</span>
                  <p>Sellers submit their phones for listing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#FF9F1C] font-bold">2.</span>
                  <p>We verify IMEI and check against blacklist databases</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#FF9F1C] font-bold">3.</span>
                  <p>Authenticated phones are listed on our platform</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#FF9F1C] font-bold">4.</span>
                  <p>Buyers can browse and purchase with confidence</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
              <p className="text-gray-200 mb-4">
                We're committed to transforming Pakistan's second-hand phone market by:
              </p>
              <ul className="text-gray-200 space-y-2">
                <li>• Ensuring 100% authentic devices</li>
                <li>• Protecting buyer interests</li>
                <li>• Supporting legitimate sellers</li>
                <li>• Maintaining market transparency</li>
                <li>• Building trust in the resale market</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">Our Impact</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-3xl font-bold text-[#FF9F1C] mb-2">10,000+</h3>
                <p className="text-gray-200">Verified Phones</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#FF9F1C] mb-2">5,000+</h3>
                <p className="text-gray-200">Happy Customers</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#FF9F1C] mb-2">99%</h3>
                <p className="text-gray-200">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage; 