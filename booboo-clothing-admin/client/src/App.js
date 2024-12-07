import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import LoginPage from "./pages/LoginPage";
import ProductManagement from "./pages/ProductManagement";
import StaffManagement from "./pages/StaffManagement";
import BrowseItems from "./pages/BrowseItems";
import './index.css';  

const App = () => {
  return (
   <div>
     <Routes>
       <Route path="/" element={<LoginPage />} />  
       <Route path="/product-management" element={<ProductManagement />} />
       <Route path="/staff-management" element={<StaffManagement />} />
       <Route path="/browse-items" element={<BrowseItems />} />
     </Routes>
   </div>
  );
};

export default App;
