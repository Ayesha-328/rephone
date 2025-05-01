import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import RegisterPage from "./client/sellers/pages/RegisterPage.jsx";
import Login from "./client/sellers/pages/SellerLoginPage.jsx";
import SellerHomePage from "./client/sellers/pages/SellerHomePage.jsx";
import SellerProfilePage from "./client/sellers/pages/SellerProfilePage.jsx"
import SellerRegisterPage from "./client/sellers/pages/SellerRegisterPage.jsx";
import { SellerDashboard } from "./client/sellers/pages/SellerDasboard.jsx";
import { SellerAuthProvider } from './client/sellers/context/SellerAuthContext';
import SellerOrdersPage from "./client/sellers/pages/SellerOrder.jsx";
import SellerProduct from "./client/sellers/pages/SellerProduct.jsx";
import SellingGuideline from "./client/sellers/pages/SellingGuidelines.jsx"; 
// import BuyersDashboard from "./pages/BuyersDashboard";/
// import SellersDashboard from "./pages/SellersDashboard";
// import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        
        {/* Seller Routes */}
        <Route path="/seller/*" element={
          <SellerAuthProvider>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<SellerRegisterPage />} />
              <Route path="home" element={<SellerHomePage />} />
              <Route path="SellerDashboard" element={<SellerDashboard />} />
              <Route path="BusinessRegister" element={<RegisterPage />} />
              <Route path="SellerProfilePage" element={<SellerProfilePage />} />
              <Route path="products" element={<SellerProduct />} />
              <Route path="orders" element={<SellerOrdersPage />} />
              <Route path="guidelines" element={<SellingGuideline />} />
              
            </Routes>
          </SellerAuthProvider>
        } />
      </Routes>
    </Router>
  );
};

export default App;
