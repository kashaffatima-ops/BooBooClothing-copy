import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  const isMainAdmin = localStorage.getItem('isMainAdmin'); // Check if main admin flag is set

  if (!token && !isMainAdmin) {
    // Redirect to login page if no token and not the main admin
    return <Navigate to="/" />;
  }

  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;
