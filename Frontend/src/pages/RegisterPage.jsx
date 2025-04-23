import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const PricingCard = ({ title, price, features, recommended }) => (
  <div className={`bg-white/10 p-6 rounded-lg backdrop-blur-sm ${recommended ? 'border-2 border-[#FF9F1C] relative' : ''}`}>
    {recommended && (
      <div className="absolute top-0 right-0 bg-[#FF9F1C] text-white px-4 py-1 rounded-bl-lg rounded-tr-lg">
        Recommended
      </div>
    )}
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <div className="mb-4">
      <span className="text-3xl font-bold text-[#FF9F1C]">Rs.{price}</span>
      <span className="text-gray-300">/month</span>
    </div>
    <ul className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-gray-200">
          <svg className="w-5 h-5 mr-2 text-[#FF9F1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

const RegisterPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('business');
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    plan: 'business'
  });

  const plans = [
    {
      id: 'basic',
      title: 'Basic',
      price: '2,999',
      features: [
        'List up to 10 phones',
        'Basic verification tools',
        'Standard support',
        'Basic analytics'
      ]
    },
    {
      id: 'business',
      title: 'Business',
      price: '5,999',
      features: [
        'List up to 50 phones',
        'Advanced verification tools',
        'Priority support',
        'Detailed analytics',
        'Featured listings'
      ],
      recommended: true
    },
    {
      id: 'premium',
      title: 'Premium',
      price: '9,999',
      features: [
        'Unlimited phone listings',
        'Premium verification tools',
        '24/7 Priority support',
        'Advanced analytics',
        'Featured listings',
        'Custom branding'
      ]
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration data:', formData);
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Start Your Business Today</h1>
            <p className="text-xl text-gray-300">
              Join Pakistan's trusted platform for second-hand phone trading
            </p>
          </div>

          {/* Pricing Plans */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => {
                  setSelectedPlan(plan.id);
                  setFormData(prev => ({ ...prev, plan: plan.id }));
                }}
                className={`cursor-pointer transform transition-transform duration-300 hover:scale-105 ${
                  selectedPlan === plan.id ? 'ring-2 ring-[#FF9F1C]' : ''
                }`}
              >
                <PricingCard {...plan} />
              </div>
            ))}
          </div>

          {/* Registration Form */}
          <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Business Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="businessName" className="block mb-2">Business Name</label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="ownerName" className="block mb-2">Owner Name</label>
                  <input
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
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
                <div>
                  <label htmlFor="phone" className="block mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
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
              </div>

              <div>
                <label htmlFor="address" className="block mb-2">Business Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="city" className="block mb-2">City</label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-white/20 border border-white/30 text-white"
                  required
                >
                  <option value="">Select a city</option>
                  <option value="karachi">Karachi</option>
                  <option value="lahore">Lahore</option>
                  <option value="islamabad">Islamabad</option>
                  <option value="rawalpindi">Rawalpindi</option>
                  <option value="faisalabad">Faisalabad</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF9F1C] hover:bg-[#f39200] text-black font-bold py-3 px-4 rounded transition duration-300"
              >
                Create Business Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Already have an account?{' '}
                <Link to="/login" className="text-[#FF9F1C] hover:text-[#f39200] font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage; 