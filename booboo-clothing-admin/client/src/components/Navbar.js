import React, { useState } from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the JWT token
    localStorage.removeItem('isMainAdmin'); // Remove the main admin flag
    navigate('/'); // Redirect to the login page
  };
  

  return (
    <div className="container-nav">
      <nav className="navbar">
        <div className="logo">
          <a href="#">BooBoo<span> Clothing</span></a>
        </div>
        <ul className={`nav-links ${isActive ? 'active' : ''}`}>
          <li>
            <Link to="/product-management">Product Management</Link>
          </li>
          <li>
            <Link to="/staff-management">Staff Management</Link>
          </li>
          <li>
            <Link to="/browse-items">Browse Items</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/sale-management">Sale Management</Link>
          </li>
          <li>
            <button className="logout-button" onClick={handleLogout}>Logout</button> 
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
