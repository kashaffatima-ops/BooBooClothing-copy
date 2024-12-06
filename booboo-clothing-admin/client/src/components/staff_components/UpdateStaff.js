import React, { useState, useEffect } from 'react';

const UpdateStaff = ({ selectedStaff }) => {
  const [staffData, setStaffData] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (selectedStaff) {
      setStaffData(selectedStaff);
    }
  }, [selectedStaff]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaffData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    console.log('Updating staff member:', staffData);
  };

  if (!selectedStaff) {
    return <p>Please select a staff member to update.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Staff Member</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={staffData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="position">Position</label>
        <input
          id="position"
          name="position"
          type="text"
          required
          value={staffData.position}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={staffData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={staffData.phone}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update Staff Member
      </button>
    </form>
  );
};

export default UpdateStaff;

