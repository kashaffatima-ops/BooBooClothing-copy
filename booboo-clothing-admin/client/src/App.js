import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import ProductManagement from "./pages/ProductManagement";
import StaffManagement from "./pages/StaffManagement";
import BrowseItems from "./pages/BrowseItems";
import Search from "./pages/Search";
import SaleManagement from "./pages/SaleManagement";
import ProtectedRoute from "./components/ProtectedRoute"; 
import './index.css';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />  {/* Public route */}
        {/* Protected routes */}
        <Route
          path="/product-management"
          element={
            <ProtectedRoute>
              <ProductManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff-management"
          element={
            <ProtectedRoute>
              <StaffManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/browse-items"
          element={
            <ProtectedRoute>
              <BrowseItems />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sale-management"
          element={
            <ProtectedRoute>
              <SaleManagement />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
