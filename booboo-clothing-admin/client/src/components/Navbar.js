import React, { useState } from 'react'; // Import useState
import '../styles/Navbar.css'; // Import your CSS for styling
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false); // Manage the active state

  const toggleMenu = () => {
    setIsActive(!isActive); // Toggle the active state
  };
  const [menu, setMenu] = useState("home");

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
            <Link to="/logout">Logout</Link>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
