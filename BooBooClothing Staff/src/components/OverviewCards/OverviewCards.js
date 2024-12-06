import React from "react";
import ordersData from '../assets/ordersData';
import { FaShippingFast, FaBoxOpen, FaCheckCircle, FaUsers, FaCoins } from 'react-icons/fa';
import { FaClipboardCheck } from 'react-icons/fa';
import './OverviewCards.css'

const OverviewCards = ()=>{
const shippedOrders = ordersData.filter(order => order.orderStatus === "shipped").length;
  const inProcessOrders = ordersData.filter(order => order.orderStatus === "in process").length;
  const receivedOrders = ordersData.filter(order => order.orderStatus === "received").length;
  const deliveredOrders = ordersData.filter(order => order.orderStatus === "delivered").length;
 
    return (<>
     {/* Overview Section */}
     <div className="overview-container">
          
          <div className="overview-card-shipped">
            <FaShippingFast size={40} color="#28a745" />
            <h3>Received Orders</h3>
            <p>{receivedOrders}</p>
          </div>
          <div className="overview-card-inprocess">
            <FaBoxOpen size={40} color="#007bff" />
            <h3>In Process Orders</h3>
            <p>{inProcessOrders}</p>
          </div>
          <div className="overview-card-delivered">
            <FaCheckCircle size={40} color="#17a2b8" />
            <h3>Shipped Orders</h3>
            <p>{shippedOrders}</p>
          </div>
          <div className="overview-card-received">
          <FaClipboardCheck size={40} color="#28a745" />
            <h3>Delivered Orders</h3>
            <p>{deliveredOrders}</p>
          </div>
        </div>

    </>);
}

export default OverviewCards;