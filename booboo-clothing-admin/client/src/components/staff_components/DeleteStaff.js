import React, { useState } from 'react';

const DeleteStaff = ({ selectedStaff }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    // Here you would typically send a delete request to your backend
    console.log('Deleting staff member:', selectedStaff);
    setShowConfirmation(false);
  };

  if (!selectedStaff) {
    return <p>Please select a staff member to delete.</p>;
  }

  return (
    <div>
      <h2>Delete Staff Member</h2>
      <p>Are you sure you want to delete the following staff member?</p>
      <p><strong>Name:</strong> {selectedStaff.name}</p>
      <p><strong>Position:</strong> {selectedStaff.position}</p>
      {!showConfirmation ? (
        <button
          onClick={() => setShowConfirmation(true)}
          className="btn btn-danger"
        >
          Delete Staff Member
        </button>
      ) : (
        <div className="confirmation-dialog">
          <p>Are you absolutely sure? This action cannot be undone.</p>
          <div className="confirmation-actions">
            <button
              onClick={handleDelete}
              className="btn btn-danger"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setShowConfirmation(false)}
              className="btn btn-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteStaff;

