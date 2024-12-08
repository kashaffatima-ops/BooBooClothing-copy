import './NavBar.css'; // Import your CSS for styling
import React, { useState, useEffect } from 'react';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'; // Add UserOutlined for the profile icon
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation


const NavBar = () => {

  const [isActive, setIsActive] = useState(false); // Manage the active state
  const [menu, setMenu] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track the login state
  const navigate = useNavigate(); // Hook for programmatic navigation

  const toggleMenu = () => {
    setIsActive(!isActive); // Toggle the active state
  };

  // Check for token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // User is logged in if token is present
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  return (
    
    <div className="container-nav">
      <nav className="navbar">
        <div className="logo">
          <a href="#">BooBoo<span> Clothing</span></a>
        </div>
        <ul className={`nav-links ${isActive ? 'active' : ''}`}> {/* Add 'active' class when isActive is true */}
          <li onClick={()=>{setMenu("home")}}><Link to='/'>Home</Link>{menu ==="home"?<hr/>: <></>}</li>
          <li onClick={()=>{setMenu("allorders")}}><Link to='/allorders'>All Orders</Link>{menu ==="allorders"?<hr/>: <></>}</li>
          <li onClick={()=>{setMenu("receivedorders")}}><Link to='/receivedorders'>Cancelled Orders</Link>{menu ==="receivedorders"?<hr/>: <></>}</li>
          <li onClick={()=>{setMenu("inprocessorders")}}><Link to='/inprocessorders'>In Process Orders</Link>{menu ==="inprocessorders"?<hr/>: <></>}</li>
          <li onClick={()=>{setMenu("shippedorders")}}><Link to='/shippedorders'>Shipped Orders</Link>{menu ==="shippedorders"?<hr/>: <></>}</li>
          <li onClick={()=>{setMenu("deliveredorders")}}><Link to='/deliveredorders'>Delivered Orders</Link>{menu ==="deliveredorders"?<hr/>: <></>}</li>

          {/* Conditionally render Profile button if logged in, else show Login */}
          {isLoggedIn ? (
            <li>
              <button className="profile-btn" onClick={handleProfileClick}>
                <UserOutlined style={{ fontSize: '20px', color: '#fff' }} />
              </button>
            </li>
          ) : (
            <li>
              <Link className="login-btn" to='/login'>Login</Link>
            </li>
          )}
        </ul>
        <div className="hamburger" onClick={toggleMenu}> {/* Add onClick event to toggle menu */}
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
