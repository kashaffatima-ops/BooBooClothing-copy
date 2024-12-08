import React, { useState } from 'react';
import axios from 'axios';

const AddSaleEventModal = ({ closeModal, setSaleEvents }) => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/sale-events', {
        name: eventName,
        description: eventDescription,
      });

      // Add the newly created event to the sale events list
      setSaleEvents(prevEvents => [...prevEvents, response.data]);
      closeModal();
    } catch (error) {
      console.error('Error creating sale event:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add Sale Event</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Save Event</button>
          <button type="button" onClick={closeModal} className="btn btn-secondary">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddSaleEventModal;
