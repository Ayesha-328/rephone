import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // We'll create this
 

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();


  const handleLogout = () => {
    logout();
    navigate('/login');
};

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-logo">
          <img src="/rephone-logo.png" alt="" height="70px" width="200px"/>
          <hr></hr>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard">
            Dashboard
          </NavLink>
          <NavLink to="/Listedproducts">
            Verification Request
          </NavLink>
          <NavLink to="/products">
            Verified Products
          </NavLink>
          <NavLink to="/SellerList">
            Seller List
          </NavLink>
          <NavLink to="/Order">
            Orders
          </NavLink>
        </nav>
      </div>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;