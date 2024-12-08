import React, { useState } from 'react';
import axios from 'axios';

const CreateStaff = () => {
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    password: '', // Add password field here
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Log the newStaff state to verify the data
    console.log('New Staff Data:', newStaff);
  
    try {
      const response = await axios.post('http://localhost:5000/api/staff', newStaff, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Staff member created:', response.data);
    } catch (error) {
      console.error('Error creating staff member:', error.response?.data || error.message);
    }
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
       <label htmlFor="role">Role</label>
       <select
         id="role"
         name="role"  
         required
         value={newStaff.role}  
         onChange={handleInputChange}
       >
         <option value="">Select Role</option>
         <option value="admin">Admin</option>
         <option value="staff">Staff</option>
       </select>
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

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={newStaff.password}
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
