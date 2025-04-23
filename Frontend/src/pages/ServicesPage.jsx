import React from 'react';
import '../index.css';
import Footer from '../components/Footer';

const ServiceCard = ({ title, description, icon, features }) => (
  <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-200 mb-4">{description}</p>
    {features && (
      <ul className="text-gray-200 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="text-[#FF9F1C]">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const ServicesPage = () => {
  const services = [
    {
      title: 'Phone Verification',
      description: 'Advanced authentication system to verify phone legitimacy.',
      icon: '🔒',
      features: [
        'IMEI verification',
        'Blacklist database check',
        'Ownership verification',
        'Device history analysis'
      ]
    },
    {
      title: 'Secure Marketplace',
      description: 'Safe and transparent platform for buying and selling.',
      icon: '🏪',
      features: [
        'Verified seller profiles',
        'Secure payment system',
        'Buyer protection',
        'Price comparison tools'
      ]
    },
    {
      title: 'Quality Assurance',
      description: 'Comprehensive phone condition assessment.',
      icon: '✅',
      features: [
        'Physical condition check',
        'Performance testing',
        'Battery health verification',
        'Functionality assessment'
      ]
    },
    {
      title: 'Seller Services',
      description: 'Tools and support for phone sellers.',
      icon: '📱',
      features: [
        'Easy listing process',
        'Market price analysis',
        'Professional photography',
        'Seller dashboard'
      ]
    },
    {
      title: 'Buyer Protection',
      description: 'Comprehensive safety measures for buyers.',
      icon: '🛡️',
      features: [
        'Money-back guarantee',
        'Authenticity verification',
        'Secure transactions',
        'Post-purchase support'
      ]
    },
    {
      title: 'Customer Support',
      description: '24/7 assistance for all users.',
      icon: '💬',
      features: [
        'Live chat support',
        'Dispute resolution',
        'Technical assistance',
        'Transaction help'
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-[#003566] text-white p-8 pt-28">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                features={service.features}
              />
            ))}
          </div>

          <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-6 text-center">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-4">📱</div>
                <h3 className="text-xl font-semibold mb-2">List Your Phone</h3>
                <p className="text-gray-200">Submit your phone details for verification</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Verification</h3>
                <p className="text-gray-200">We verify authenticity and condition</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">✨</div>
                <h3 className="text-xl font-semibold mb-2">Get Listed</h3>
                <p className="text-gray-200">Approved phones get listed on our platform</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold mb-2">Secure Sale</h3>
                <p className="text-gray-200">Complete secure transactions with buyers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage; 