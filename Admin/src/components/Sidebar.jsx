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
          <h1>Rephone</h1>
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
        </nav>
      </div>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;