import React, { useState } from 'react';
import StaffNavbar from './StaffNavbar';
import CreateStaff from './CreateStaff';
import ViewStaff from './ViewStaff';
import UpdateStaff from './UpdateStaff';
import DeleteStaff from './DeleteStaff';
import '../../styles/StaffManagement.css';

const StaffManagementContent = () => {
  const [activeView, setActiveView] = useState('view');
  const [selectedStaff, setSelectedStaff] = useState(null);

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
        return <ViewStaff onStaffSelect={handleStaffSelect} />;
      case 'update':
        return <UpdateStaff selectedStaff={selectedStaff} />;
      case 'delete':
        return <DeleteStaff selectedStaff={selectedStaff} />;
      default:
        return <ViewStaff onStaffSelect={handleStaffSelect} />;
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

