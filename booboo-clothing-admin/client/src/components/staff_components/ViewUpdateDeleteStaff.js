import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewUpdateDeleteStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [updatedStaffData, setUpdatedStaffData] = useState({
    name: '',
    role: '', // Role corresponds to position
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const response = await axios.get('http://localhost:5000/api/staff', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        });
        setStaffList(response.data.data);
        
      } catch (err) {
        setError('Failed to fetch staff data' , err);
      } finally {
        setLoading(false);
      }
    };    

    fetchStaff();
  }, []);

  const handleStaffSelect = (staff) => {
    setSelectedStaff(staff);
    setUpdatedStaffData({
      name: staff.name,  // Ensure that name, phone, role are available in response
      role: staff.role,
      email: staff.email,
      phone: staff.phone,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStaffData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/staff/${selectedStaff._id}`,
        updatedStaffData
      );
      // Update the staff list with the updated data
      const updatedStaffList = staffList.map((staff) =>
        staff._id === selectedStaff._id ? response.data.data : staff
      );
      setStaffList(updatedStaffList);
      setSelectedStaff(null); // Clear selection after update
    } catch (err) {
      setError('Failed to update staff');
    }
  };

  const handleDelete = async (staffId) => {
    try {
      await axios.delete(`http://localhost:5000/api/staff/${staffId}`);
      // Remove the deleted staff from the list
      const updatedStaffList = staffList.filter((staff) => staff._id !== staffId);
      setStaffList(updatedStaffList);
    } catch (err) {
      setError('Failed to delete staff');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>View and Update Staff Members</h2>

      {/* Staff Update Form */}
      {selectedStaff && (
        <div>
          <h3>Update Staff Member</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={updatedStaffData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                name="role"
                value={updatedStaffData.role}  // "role" instead of "position"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={updatedStaffData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={updatedStaffData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Staff Member
            </button>
          </form>
        </div>
      )}

      {/* Staff Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.length === 0 ? (
            <tr>
              <td colSpan="5">No staff members available.</td>
            </tr>
          ) : (
            staffList.map((staff) => (
              <tr key={staff._id}>
                <td>{staff.name}</td>
                <td>{staff.role}</td>  {/* Ensure role is used for position */}
                <td>{staff.email}</td>
                <td>{staff.phone}</td>
                <td>
                  <button
                    onClick={() => handleStaffSelect(staff)}
                    className="btn btn-primary"
                  >
                    Select
                  </button>
                  <button
                    onClick={() => handleDelete(staff._id)}
                    className="btn btn-danger"
                    style={{ marginLeft: '10px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUpdateDeleteStaff;