import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShippingFast, FaBoxOpen, FaCheckCircle, FaClipboardCheck } from 'react-icons/fa';
import './OverviewCards.css';

const OverviewCards = () => {
  const [orders, setOrders] = useState([]);
  const [shippedOrders, setShippedOrders] = useState(0);
  const [inProcessOrders, setInProcessOrders] = useState(0);
  const [canceledOrders, setCanceledOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders/viewAll");
        const orderResponse = response.data.allorders;

        // Count orders by their status
        setShippedOrders(orderResponse.filter(order => order.status === "shipped").length);
        setInProcessOrders(orderResponse.filter(order => order.status === "pending").length);
        setCanceledOrders(orderResponse.filter(order => order.status === "canceled").length);
        setDeliveredOrders(orderResponse.filter(order => order.status === "delivered").length);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      {/* Overview Section */}
      <div className="overview-container">
        <div className="overview-card-received">
          <FaShippingFast size={40} color="#dc3545" />
          <h3>Canceled Orders</h3>
          <p>{canceledOrders}</p>
        </div>
        <div className="overview-card-inprocess">
          <FaBoxOpen size={40} color="#007bff" />
          <h3>In Process Orders</h3>
          <p>{inProcessOrders}</p>
        </div>
        <div className="overview-card-shipped">
          <FaCheckCircle size={40} color="#28a745" />
          <h3>Shipped Orders</h3>
          <p>{shippedOrders}</p>
        </div>
        <div className="overview-card-delivered">
          <FaClipboardCheck size={40} color="#17a2b8" />
          <h3>Delivered Orders</h3>
          <p>{deliveredOrders}</p>
        </div>
      </div>
    </>
  );
};

export default OverviewCards;
