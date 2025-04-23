import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import { SellerDashboard } from "./client/sellers/pages/SellerDasboard.jsx";
// import BuyersDashboard from "./pages/BuyersDashboard";/
// import SellersDashboard from "./pages/SellersDashboard";
// import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/SellerDashboard" element={<SellerDashboard />} />
        {/* <Route path="/buyers/dashboard" element={<BuyersDashboard />} /> */}
        {/* <Route path="/sellers/dashboard" element={<SellersDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
