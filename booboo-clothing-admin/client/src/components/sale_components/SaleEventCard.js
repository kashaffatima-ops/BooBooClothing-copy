import React from 'react';
import '../../styles/SaleEventCard.css'

const SaleEventCard = ({ event }) => {
  return (
    <div className="sale-event-card">
      <h3>{event.name}</h3>
      <p>{event.description}</p>
    </div>
  );
};

export default SaleEventCard;
