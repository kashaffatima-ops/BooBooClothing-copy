import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddSaleEventModal from '../components/sale_components/AddSaleEventModal'; 
import SaleEventCard from '../components/sale_components/SaleEventCard'; 
import Navbar from '../components/Navbar';

const SaleManagement = () => {
  const [saleEvents, setSaleEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch Sale Events from Database
  useEffect(() => {
    const fetchSaleEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sale-events');
        setSaleEvents(response.data);
      } catch (error) {
        console.error('Error fetching sale events:', error);
      }
    };
    fetchSaleEvents();
  }, [saleEvents]); // Refresh sale events after an event is added

  // Function to handle modal visibility
  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
    <Navbar />
      <button onClick={handleAddClick} className="btn btn-primary">
        Add Sale Event
      </button>

      {/* Modal for adding a sale event */}
      {showModal && (
        <AddSaleEventModal 
          closeModal={handleCloseModal}
          setSaleEvents={setSaleEvents}  // Propagate updated sale events to parent
        />
      )}

      <div className="sale-events-container">
        {saleEvents.map((event) => (
          <SaleEventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default SaleManagement;
