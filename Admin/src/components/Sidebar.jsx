import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h1>Rephone</h1>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          Dashboard
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>
          Product Listing
        </NavLink>
        <NavLink to="/imei-verifications" className={({ isActive }) => isActive ? 'active' : ''}>
          IMEI Verifications
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;