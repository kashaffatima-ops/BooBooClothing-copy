import React from "react";
import "./ListProducts.css";

const ListProducts = (props) => {

  return (
    <div className="item">
      <p>ID: {props.id}</p>
      <p>{props.quantity}</p>
    </div>
  );
};

export default ListProducts;

// detail view of each product