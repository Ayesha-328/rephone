import React, { useState } from 'react';
import '../index.css';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
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
          <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-white/20 border border-white/30 text-white"
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
                    className="w-full p-2 rounded bg-white/20 border border-white/30 text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block mb-2">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-white/20 border border-white/30 text-white"
                    required
                  >
                    <option value="general">General Inquiry</option>
                    <option value="seller">Seller Support</option>
                    <option value="buyer">Buyer Support</option>
                    <option value="verification">Phone Verification</option>
                    <option value="technical">Technical Support</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-white/20 border border-white/30 text-white h-32"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#FF9F1C] hover:bg-[#f39200] text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <h2 className="text-2xl font-semibold mb-4">Support Hours</h2>
                <div className="space-y-2 text-gray-200">
                  <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                  <p>Saturday: 10:00 AM - 6:00 PM</p>
                  <p>Sunday: Closed</p>
                  <p className="mt-4">24/7 Online Support Available</p>
                </div>
              </div>

              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <h2 className="text-2xl font-semibold mb-4">Quick Support</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-[#FF9F1C]">Seller Support</h3>
                    <p className="text-gray-200">seller.support@rephone.pk</p>
                    <p className="text-gray-200">+92 300 1234567</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-[#FF9F1C]">Buyer Support</h3>
                    <p className="text-gray-200">buyer.support@rephone.pk</p>
                    <p className="text-gray-200">+92 300 7654321</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-[#FF9F1C]">Technical Support</h3>
                    <p className="text-gray-200">tech.support@rephone.pk</p>
                    <p className="text-gray-200">+92 300 9876543</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <h2 className="text-2xl font-semibold mb-4">Office Location</h2>
                <div className="text-gray-200">
                  <p>Office #402, 4th Floor</p>
                  <p>Business Plaza</p>
                  <p>Shahrah e faisal</p>
                  <p>Karachi, Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage; 