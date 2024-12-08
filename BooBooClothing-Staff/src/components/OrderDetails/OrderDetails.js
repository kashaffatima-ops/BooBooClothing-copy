import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderDetails.css";
import Footer from "../Footer/Footer";
import ListProducts from "../ListProducts/ListProducts";
import axios from "axios";

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state;
  let name;
  let email;

  console.log(order);

  const updateStatus = async (status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/orders/updateStatus/${order.order_id}`,
        { status }
      );
      console.log(response);
      if (response.status === 200) {
        setOrderDetails((prevDetails) => ({
          ...prevDetails,
          status,
        }));

        alert(`Order ${order.order_id} status updated to ${status}`);
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const [orderDetails, setOrderDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [productList, setProductList] = useState([]);
  console.log(order.order_id);

  useEffect(() => {
    const fetchOrderAndUser = async () => {
      try {
        console.log("here");
        // Fetch the order details by ID
        const orderResponse = await axios.get(
          `http://localhost:5000/api/orders/id/${order.order_id}`
        );
        const orderDetail = orderResponse.data.order;

        if (!orderDetail) {
          console.error("Order not found");
          return;
        }

        // Fetch the user details associated with the order
        const userResponse = await axios.get(
          `http://localhost:5000/api/orders/getCustomer/${orderDetail.userId}`
        );
        const user = userResponse.data.user;

        if (!user) {
          console.error("User not found for this order");
          return;
        }
        console.log("order :");
        console.log(orderDetail);

        console.log("user :");
        console.log(user);

        const productIds = orderDetail.items.map((item) => item.itemId);
        const productResponse = await axios.post(
          "http://localhost:5000/api/orders/byIds",
          {
            ids: productIds,
          }
        );

        const products = productResponse.data.products || [];
        setProductList(products);
        console.log.apply("product:");
        console.log(productResponse);

        // Set the fetched data into state
        setOrderDetails(orderDetail);
        setUserDetails(user);
      } catch (error) {
        console.error("Error fetching order and user details:", error);
      }
    };

    fetchOrderAndUser();
  }, []);

  console.log("order detail:");
  console.log(orderDetails);

  console.log("user detail:");
  console.log(userDetails);

  console.log("product:");
  console.log(productList);

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
          <strong>Customer Email:</strong> {userDetails ? userDetails.email : "Loading..."}
        </p>
        <p>
          <strong>Order Date:</strong> {order.orderdate}
        </p>
        <p>
          <strong>Total Amount:</strong> {order.total}
        </p>
        <p>
          <strong>Order Status:</strong> {orderDetails ? orderDetails.status : "Loading..."}
        </p>

          {/* List all products */}
          <h2>Products Ordered</h2>
          <div className="format-heading">
            <p>Product</p>
            <p>Id</p>
            <p>Name</p>
            <p>Individual Price</p>
            <p>Quantity</p>
            <p>Price</p>
          </div>
          {Array.isArray(productList) && productList.length > 0 ? (
            productList.map((product, index) => {
              const quantity = orderDetails.items.find(
                (item) => item.itemId === product._id
              ).quantity;
              return (
                <>
                  <ListProducts
                    key={index}
                    product={product} // Pass the entire product object as a prop
                    quantity={quantity}
                  />
                </>
              );
            })
          ) : (
            <p>No products found.</p>
          )}
          <div />

          <div className="order-actions">
            <button onClick={() => updateStatus("pending")}>
              Mark as Pending
            </button>
            <button onClick={() => updateStatus("shipped")}>
              Mark as Shipped
            </button>
            <button onClick={() => updateStatus("delivered")}>
              Mark as Delivered
            </button>
            <button
              onClick={() => updateStatus("canceled")}
              className="cancel-button"
            >
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
