import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h3>About Us</h3>
          <p>
            We provide the best collections of fashion and trends, designed to make you stand out.
          </p>
        </div>
        <div className="footer-links">
  <h3>Quick Links</h3>
  <ul className="nav-links">
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/orders">Orders</Link>
    </li>
    <li>
      <Link to="/chatforum">Chat Forum</Link>
    </li>
    
  </ul>
</div>

        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 BooBoo Clothing. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
