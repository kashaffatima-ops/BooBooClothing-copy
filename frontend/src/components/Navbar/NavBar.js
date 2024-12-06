import React, { useState } from 'react'; // Import useState
import './NavBar.css'; // Import your CSS for styling
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const NavBar = () => {
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
        <ul className={`nav-links ${isActive ? 'active' : ''}`}> {/* Add 'active' class when isActive is true */}
          <li onClick={()=>{setMenu("home")}}><Link to='/'>Home</Link>{menu ==="home"?<hr/>: <></>}</li>
          <li onClick={()=>{setMenu("mens")}}><Link to='/mens'>Mens</Link>{menu ==="mens"?<hr/>: <></>}</li>
          <li onClick={()=>{setMenu("kids")}}><Link to='/kids'>Kids</Link>{menu ==="kids"?<hr/>: <></>}</li>
          <li><Link to='/cart'><ShoppingCartOutlined style={{color: '#000', fontSize: '25px'}} /></Link></li>

          <li><Link className="login-btn" to='/login'>Login</Link></li>
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
