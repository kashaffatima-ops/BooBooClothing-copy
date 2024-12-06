import React from 'react';

const StaffNavbar = ({ activeView, onNavClick }) => {
  const navItems = [
    { id: 'view', label: 'View Staff' },
    { id: 'create', label: 'Create Staff' },
    { id: 'update', label: 'Update Staff' },
    { id: 'delete', label: 'Delete Staff' },
  ];

  return (
    <nav className="staff-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={activeView === item.id ? 'active' : ''}
          onClick={() => onNavClick(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default StaffNavbar;

