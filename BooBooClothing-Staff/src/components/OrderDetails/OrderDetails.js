import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderDetails.css";
import Footer from "../Footer/Footer";
import ListProducts from "../ListProducts/ListProducts";

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state;
  console.log(order);
  const updateStatus = (status) => {
    console.log(`Order ${order.order_id} status updated to ${status}`);
    // Here you can add API calls to update the order status in the backend
  };

  const cancelOrder = () => {
    console.log(`Order ${order.order_id} canceled`);
    // Add API call to cancel the order
    navigate("/allorders");
  };

  return (
    <>
      <div className="container">
        <div className="order-details">
          <h1>Order Details</h1>
          <p>
            <strong>Order ID:</strong> {order.order_id}
          </p>
          <p>
            <strong>Customer Name:</strong> {order.customerName}
          </p>
          <p>
            <strong>Customer Contact Number:</strong> {order.contact}
          </p>
          <p>
            <strong>Customer Email:</strong> {order.email}
          </p>
          <p>
            <strong>Customer Address:</strong> {order.address}
          </p>
          <p>
            <strong>Order Date:</strong> {order.orderdate}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.payment}
          </p>
          <p>
            <strong>Total Amount:</strong> {order.total}
          </p>
          <p>
            <strong>Order Status:</strong> {order.orderStatus}
          </p>

          {/* List all products */}
          

          <div className="products-list">
            <h2>Products Ordered</h2>
            <div className="format-heading">
            <p>Product</p>
            <p>Id</p>
            <p>Name</p>
            <p>Individual Price</p>
            <p>Quantity</p>
            <p>Price</p>
          </div>
            {order.orderdProductsList.map((item, index) => {
              console.log("Id:");
              console.log(item.product);

              return (
                <ListProducts
                  key={index}
                  id={item.product}
                  quantity={item.quantity}
                />
              );
            })}
          </div>

          <div className="order-actions">
            <button onClick={() => updateStatus("In Progress")}>
              Mark as In Progress
            </button>
            <button onClick={() => updateStatus("Shipped")}>
              Mark as Shipped
            </button>
            <button onClick={() => updateStatus("Delivered")}>
              Mark as Delivered
            </button>
            <button onClick={cancelOrder} className="cancel-button">
              Cancel Order
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderDetails;
