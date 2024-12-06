import React, { useState } from 'react';

const ViewStaff = ({ onStaffSelect }) => {
  // This would typically come from your backend
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'John Doe', position: 'Manager', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', position: 'Assistant', email: 'jane@example.com', phone: '098-765-4321' },
  ]);

  return (
    <div>
      <h2>View Staff Members</h2>
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
          {staffList.map((staff) => (
            <tr key={staff.id}>
              <td>{staff.name}</td>
              <td>{staff.position}</td>
              <td>{staff.email}</td>
              <td>{staff.phone}</td>
              <td>
                <button onClick={() => onStaffSelect(staff)} className="btn btn-primary">
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStaff;

