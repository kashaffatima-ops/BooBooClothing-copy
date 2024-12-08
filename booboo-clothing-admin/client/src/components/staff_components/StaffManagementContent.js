import React, { useState, useEffect } from 'react';
import StaffNavbar from './StaffNavbar';
import CreateStaff from './CreateStaff';
import ViewUpdateDeleteStaff from './ViewUpdateDeleteStaff';
import axios from 'axios';
import '../../styles/StaffManagement.css';

const StaffManagementContent = () => {
  const [activeView, setActiveView] = useState('view');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/staff');
        if (response.data.success) {
          setStaffList(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };

    fetchStaff();
  }, []);

  const handleNavClick = (view) => {
    setActiveView(view);
    setSelectedStaff(null);
  };

  const handleStaffSelect = (staff) => {
    setSelectedStaff(staff);
  };
  
  const renderContent = () => {
    switch (activeView) {
      case 'create':
        return <CreateStaff />;
      case 'view':
        return <ViewUpdateDeleteStaff staffList={staffList} onStaffSelect={handleStaffSelect} />;
      default:
        return <ViewUpdateDeleteStaff staffList={staffList} onStaffSelect={handleStaffSelect} />;
    }
  };

  return (
    <div className="container">
      <StaffNavbar activeView={activeView} onNavClick={handleNavClick} />
      <div className="content-wrapper">
        {renderContent()}
      </div>
    </div>
  );
};

export default StaffManagementContent;
