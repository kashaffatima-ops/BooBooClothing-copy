import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Retrieve token from local storage

  if (!token) {
    // Redirect to login page if no token
    return <Navigate to="/" />;
  }

  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;
