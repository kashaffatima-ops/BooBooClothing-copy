import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const [staff, setStaff] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to access your profile.");
      window.location.href = "/login";
      return;
    }

    // Fetch user profile to get the email
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

  useEffect(() => {
    // Fetch staff data once the email is available
    if (email) {
      axios
        .get(`http://localhost:5000/api/staff/getstaff/email/${email}`)
        .then((response) => {
          setStaff(response.data.data); // Set staff data in state
        })
        .catch((error) => {
          console.error("Error fetching staff details:", error);
          setError("Unable to fetch staff details.");
        });
    }
  }, [email]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!staff) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Staff Profile</h1>
        <div className="profile-info">
          <div className="profile-detail">
            <strong>Name:</strong> <span>{staff.name}</span>
          </div>
          <div className="profile-detail">
            <strong>Email:</strong> <span>{staff.email}</span>
          </div>
          <div className="profile-detail">
            <strong>Role:</strong> <span>{staff.role}</span>
          </div>
          <div className="profile-detail">
            <strong>Phone:</strong> <span>{staff.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
