import "./Inprocess.css";
import React, { useEffect, useState } from "react";
import Order from "../Order/Order";
import axios from "axios";

const Inprocess = () => {

  const [orders, setOrders] = useState([]);

  const fetchCustomerName = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/getCustomer/${userId}`);
      return response.data.user.name; // Return the user's name
    } catch (error) {
      console.error("Error fetching customer data:", error);
      return "Unknown"; // Default value if error occurs
    }
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders/viewAll");
        const orderresponse = response.data.allorders;

        // Fetch customer names for each order
        const shippedOrders = orderresponse.filter(order => order.status === 'pending');

        // Fetch customer names for each shipped order
        const ordersWithCustomerData = await Promise.all(
          shippedOrders.map(async (order) => {
            const customerName = await fetchCustomerName(order.userId);
            console.log(customerName);
            return { ...order, customerName }; // Merge customer name into order data
          })
        );

        setOrders(ordersWithCustomerData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);
  
  return (
    <div className="delivered-order">
      <br />
      <br />
      <h1>In Process Orders</h1>
      <div className="listorders-format-main">
        <p>Order ID</p>
        <p>Customer</p>
        <p>Order Date</p>
        <p>Total</p>
        <p>Items</p>
        <p>Payment</p>
      </div>

      <div className="listorder-allorders">
        <hr />
        {orders.map((order) => {
          const totalItems = order.items.reduce(
            (acc, item) => acc + item.quantity,
            0
          );
          return (
            <Order
              key={order._id}
              order_id={order._id}
              customerName={order.customerName} // Updated to use fetched customer name
              orderdate={new Date(order.createdAt).toLocaleDateString()}
              total={order.totalAmount}
              items={totalItems}
              payment={order.status}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Inprocess;