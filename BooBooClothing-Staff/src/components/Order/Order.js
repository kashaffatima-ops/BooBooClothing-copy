import React from "react";
import { useNavigate } from "react-router-dom";
import "./Order.css";

const Order = (props) => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate(`/order/${props.order_id}`, { state: props });
  };

  return (
    <div className="item" onClick={handleOrderClick}>
      <p>{props.order_id}</p>
      <p>{props.customerName}</p>
      <p>{props.orderdate}</p>
      <p>{props.total}</p>
      <p>{props.items}</p>
      <p>{props.payment}</p>
    </div>
  );
};

export default Order;
