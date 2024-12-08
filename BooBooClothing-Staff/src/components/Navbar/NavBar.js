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
          <li onClick={()=>{setMenu("chatforum")}}><Link to='/chatforum'>Chat Forum</Link>{menu ==="chatforum"?<hr/>: <></>}</li>
          <li onClick={()=>{setMenu("allorders")}}><Link to='/allorders'>All Orders</Link>{menu ==="allorders"?<hr/>: <></>}</li>
          <li onClick={()=>{setMenu("receivedorders")}}><Link to='/receivedorders'>Cancelled Orders</Link>{menu ==="receivedorders"?<hr/>: <></>}</li>
          <li onClick={()=>{setMenu("inprocessorders")}}><Link to='/inprocessorders'>In Process Orders</Link>{menu ==="inprocessorders"?<hr/>: <></>}</li>
          <li onClick={()=>{setMenu("shippedorders")}}><Link to='/shippedorders'>Shipped Orders</Link>{menu ==="shippedorders"?<hr/>: <></>}</li>
          <li onClick={()=>{setMenu("deliveredorders")}}><Link to='/deliveredorders'>Delivered Orders</Link>{menu ==="deliveredorders"?<hr/>: <></>}</li>


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
