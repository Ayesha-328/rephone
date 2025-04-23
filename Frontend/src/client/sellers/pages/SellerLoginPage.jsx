import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../../components/Footer';

const SellerLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/seller/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('sellerToken', data.token);
        navigate('/seller/home');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
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
        <div className="max-w-md mx-auto">
          <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-3xl font-bold mb-6 text-center">Seller Login</h1>
            <p className="text-center text-gray-300 mb-6">
              Sign in to start selling phones on Rephone
            </p>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-white p-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-[#FF9F1C] hover:text-[#f39200]">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF9F1C] hover:bg-[#f39200] text-black font-bold py-3 px-4 rounded transition duration-300"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-300">
                New to selling on Rephone?{' '}
                <Link to="/seller/register" className="text-[#FF9F1C] hover:text-[#f39200] font-semibold">
                  Register as a seller
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

export default SellerLoginPage; 