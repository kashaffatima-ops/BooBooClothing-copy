import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import '../styles/LoginForm.css';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault(); 

    if(email === "faizrh209@gmail.com" && password === "r") {
      alert("Logged In");
      navigate("/product-management"); 
    } else {
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <div className="login-container">
      <h1>Admin Login</h1>
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
