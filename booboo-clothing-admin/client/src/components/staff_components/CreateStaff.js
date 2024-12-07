import React, { useState } from 'react';

const CreateStaff = () => {
  const [newStaff, setNewStaff] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Creating new staff member:', newStaff);
    // Reset form after submission
    setNewStaff({ name: '', position: '', email: '', phone: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Staff Member</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={newStaff.name}
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
          value={newStaff.position}
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
          value={newStaff.email}
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
          value={newStaff.phone}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create Staff Member
      </button>
    </form>
  );
};

export default CreateStaff;

