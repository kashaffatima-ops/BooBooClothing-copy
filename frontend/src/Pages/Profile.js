import React, { useState, useEffect } from "react";
import "./Profile.css"; // Import the CSS for styling
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";

const ProfilePage = () => {
  const [email, setEmail] = useState("");
  const [showPasswordBox, setShowPasswordBox] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [orders, setOrders] = useState([]); // State to store user's orders
  const [showOrders, setShowOrders] = useState(false); // State to toggle orders display

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to access your profile.");
      window.location.href = "/login";
      return;
    }

    // Fetch user profile
    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEmail(response.data.email); // Set the user's email
      })
      .catch((error) => {
        console.error("Error fetching profile details:", error);
        setErrorMessage("Failed to fetch profile details. Please try again later.");
      });
  }, []);

  const fetchOrders = () => {
    const token = localStorage.getItem("token");

    axios.post("http://localhost:5000/api/auth/findByToken", { token })
   
    .then((response) => {
        const uid = response.data.userId;
        return  axios
        .get(`http://localhost:5000/api/orders/view/?userId=${uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setOrders(response.data.orders); // Set the user's orders
          setErrorMessage("");
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setErrorMessage("Failed to fetch orders. Please try again.");
        });
      })

   
  };

  const handleResetPassword = () => {
    if (!newPassword) {
      alert("Please enter a new password.");
      return;
    }

    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:5000/api/auth/update-password",
        { newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setSuccessMessage("Password reset successful!");
        setErrorMessage("");
        setShowPasswordBox(false);
        setNewPassword("");
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
        setErrorMessage("Failed to reset password. Please try again.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    window.location.href = "/"; // Redirect to home page
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="user-icon">
          <UserOutlined style={{ fontSize: "100px", color: "#666" }} />
        </div>
        <h1 className="heading">Your Profile</h1>
      </div>

      <div className="profile-details">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p><strong>Email:</strong> {email}</p>
        <button onClick={() => setShowPasswordBox(!showPasswordBox)}>
          {showPasswordBox ? "Cancel" : "Reset Password"}
        </button>
        <button onClick={fetchOrders}>View Orders</button>
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </div>

      {showPasswordBox && (
        <div className="password-reset-box">
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleResetPassword}>Confirm</button>
        </div>
      )}

      {orders.length > 0 && (
        <div className="orders-list">
        <h2>Your Orders</h2>
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
              <p><strong>Total:</strong> PKR {order.totalAmount.toFixed(2)}</p>
              <p><strong>Items:</strong></p>
              <ul className="item-list">
                {order.items.map((item) => (
                  <li key={item.itemId._id}>
                    <p><strong>Item ID:</strong> {item.itemId._id}</p>
                    <p>{item.itemId.name} - Quantity: {item.quantity}</p>
                    <p><strong>Price:</strong> PKR {item.price.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default ProfilePage;
