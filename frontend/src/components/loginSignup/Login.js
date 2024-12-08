import React, { useState } from "react";
import axios from 'axios'; // for making API calls
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Login.css'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const navigate = useNavigate(); // Initialize navigate function

  const toggleMode = () => setIsLogin(!isLogin);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const { token } = response.data;
        // Store the token in localStorage
        localStorage.setItem("token", token);
        console.log("Logged in successfully");
  
        // Redirect to the home page ("/")
        navigate('/');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // If backend sends a 401 status for wrong credentials
          alert("Invalid email or password. Please try again.");
        } else {
          // Other errors (e.g., server down)
          console.error("Login failed", error);
          alert("Your Email or Password is incorrect! Try again.");
        }
      }
    } else {
      // Handle signup logic
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Signed up successfully");
  
        // Redirect to login or home page
        navigate('/'); // Or navigate('/') if you want to go to the home page
      } catch (error) {
        console.error("Signup failed", error);
        alert("An error occurred during signup. Please try again.");
      }
    }
  };
  

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required={!isLogin}
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="auth-button">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <p className="toggle-link">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span onClick={toggleMode}>{isLogin ? "Sign up" : "Login"}</span>
      </p>
    </div>
  );
};

export default Login;
