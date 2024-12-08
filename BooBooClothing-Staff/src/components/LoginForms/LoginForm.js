import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginForm.css';
import axios from 'axios';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Hardcoded Main Admin credentials
  const mainAdminEmail = "faizrh209@gmail.com";
  const mainAdminPassword = "r";

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Check if the user is the hardcoded main admin
    if (email === mainAdminEmail && password === mainAdminPassword) {
      alert("Logged in as Main Admin");
      localStorage.setItem('isMainAdmin', true); // Set the main admin flag
      navigate("/");
      return;
    }
  
    // If not the main admin, proceed with the regular login flow
    try {
      const response = await axios.post('http://localhost:5000/api/staff/login', {
        email,
        password,
      });
  
      const { token, user } = response.data;
      localStorage.setItem('token', token); // Store token in local storage
  
      if (user.role === 'admin') {
        alert("Logged in as Admin");
        navigate("/");
      } else if (user.role === 'staff') {
        alert("Logged in as Staff");
        navigate("/");
      } else {
        setError("Unknown role. Please contact the administrator.");
      }
    } catch (error) {
      setError("Invalid credentials or server error.");
    }
  };
  

  return (
    <div className="login-container">
      <h1>Admin/Staff Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
