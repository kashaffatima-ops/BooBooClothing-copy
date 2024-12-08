import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js';
import { Bar } from "react-chartjs-2"; 
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaUsers, FaCoins } from 'react-icons/fa';
import './OverviewGraph.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OverviewGraph = () => {
  const [orders, setOrders] = useState([]);
  const [shippedOrders, setShippedOrders] = useState(0);
  const [inProcessOrders, setInProcessOrders] = useState(0);
  const [canceledOrders, setCanceledOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

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

        // Calculate total revenue
        const totalRevenue = orderResponse.reduce((acc, order) => acc + order.totalAmount, 0);
        setTotalRevenue(totalRevenue);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const totalOrders = shippedOrders + inProcessOrders + canceledOrders + deliveredOrders;

  const chartData = {
    labels: ["Canceled", "In Process", "Shipped", "Delivered"],
    datasets: [
      {
        label: "Orders",
        data: [canceledOrders, inProcessOrders, shippedOrders, deliveredOrders],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <>
      {/* Graph and Total Revenue Section */}
      <div className="graph-revenue-container">
        <div className="graph-container">
          <Bar data={chartData} options={chartOptions} />
        </div>

        <div className="revenue-card">
          <FaUsers size={40} color="#6c757d" />
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>

        {/* Total Revenue Card */}
        <div className="revenue-card">
          <FaCoins size={40} color="#ffd700" />
          <h3>Total Revenue</h3>
          <p>PKR {totalRevenue}</p>
        </div>
      </div>
    </>
  );
};

export default OverviewGraph;
