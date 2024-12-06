import React, { useEffect, useRef } from 'react';
import ordersData from '../assets/ordersData';
import { Chart } from 'chart.js';
import { Bar } from "react-chartjs-2"; 
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {FaUsers, FaCoins } from 'react-icons/fa';
import './OverviewGraph.css'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const OverviewGraph = ()=>{
const shippedOrders = ordersData.filter(order => order.orderStatus === "shipped").length;
  const inProcessOrders = ordersData.filter(order => order.orderStatus === "in process").length;
  const receivedOrders = ordersData.filter(order => order.orderStatus === "received").length;
  const deliveredOrders = ordersData.filter(order => order.orderStatus === "delivered").length;
  const totalorders = shippedOrders + inProcessOrders + receivedOrders + deliveredOrders;
  
  let totalRevenue=0;
  for(let i=0;i<ordersData.length;i++){
    totalRevenue=+ordersData[i].total;
  }

  const chartData = {
    labels: ["Received","In Process","Shipped",   "Delivered"],
    datasets: [
      {
        label: "Orders",
        data: [receivedOrders,inProcessOrders,shippedOrders,   deliveredOrders],
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

  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);


    return (<>
     {/* Graph and Total Revenue Section */}
     <div className="graph-revenue-container">
          <div className="graph-container">
            <Bar data={chartData} options={chartOptions} />
          </div>

          <div className="revenue-card">
            <FaUsers size={40} color="#6c757d" />
            <h3>Total Orders</h3>
            <p>{totalorders}</p>
          </div>

          {/* Total Revenue Card */}
          <div className="revenue-card">
          <FaCoins size={40} color="#ffd700" />
          <h3>Total Revenue</h3>
            <p>${totalRevenue}</p>
          </div>
        </div>

    </>);
}

export default OverviewGraph;