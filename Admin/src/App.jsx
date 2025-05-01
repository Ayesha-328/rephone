import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css';
import ListedProducts from './pages/ListedProducts';
import Order from './pages/Orders';
import SellerList from './pages/SellerList';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('adminId')  // Check if adminId exists
  );

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <Header />
          {children}
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={<Login setIsAuthenticated={setIsAuthenticated} />} 
        />
        <Route 
          path="/register" 
          element={<Register />} 
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductListing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Listedproducts"
          element={
            <ProtectedRoute>
              <ListedProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Order"
          element={
            <ProtectedRoute>
              < Order/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/SellerList"
          element={
            <ProtectedRoute>
              < SellerList/>
            </ProtectedRoute>
          }
        />
        <Route path="/product-details/:imei" element={<ProductDetails />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;