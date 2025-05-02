import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import { SellerDashboard } from "./client/sellers/pages/SellerDasboard.jsx";
import OrderPage from "./client/buyers/component/orderPage.jsx";
import Payment from "./client/buyers/component/Payment.jsx";
// import PhoneDescription from "./components/PhoneDescription.jsx";
import ProductDescription from "./components/PhoneDescription.jsx";
import { CartProvider } from "./client/buyers/component/CartContext.jsx";
import OrderConfirmation from "./client/buyers/component/OrderConfirmation.jsx";

const App = () => {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<HomePage />} />
    //     <Route path="/SellerDashboard" element={<SellerDashboard />} />
        // <Route path="/cart" element={<OrderPage />} />
    //     <Route path="/Checkout" element={<Payment />} />
    //     <Route path="/product/:id" element={<ProductDescription />} />
    //   </Routes>
    // </Router>
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SellerDashboard" element={<SellerDashboard />} />
          <Route path="/cart" element={<OrderPage />} />
          <Route path="/Checkout" element={<Payment />} />
          <Route path="/product/:id" element={<ProductDescription />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
