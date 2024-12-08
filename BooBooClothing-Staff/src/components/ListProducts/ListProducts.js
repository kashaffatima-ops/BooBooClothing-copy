// import React from "react";
// import "./ListProducts.css";
// import data_product from "../assets/data";
// const ListProducts = (props) => {

//   const product = data_product.find((item) => item.id === props.id);
//   const totalPrice = product.newPrice * (props.quantity || 1);
//   return (
//     <div className="item">
//       <img src={product.image} alt={product.name} className="product-image" />
//       <p>{props.id}</p>
//       <p>{product.Name}</p>
//       <p>{product.newPrice}</p>
//       <p>{props.quantity}x</p>
//       <p>{totalPrice}</p>
//     </div>
//   );
// };

// export default ListProducts;

// // detail view of each product

import React from "react";
import "./ListProducts.css";

const ListProducts = (props) => {
  const { product, quantity } = props;  // Destructure the product and quantity from props
  const totalPrice = product.newPrice * (quantity || 1);  // Calculate total price

  return (
    <div className="item">
      <img
        src={`http://localhost:5000/${product.imageName}`}  // Assuming your image is stored on the server
        alt={product.Name}
        className="product-image"
      />
      <p>{product._id}</p>  {/* Display the product id */}
      <p>{product.Name}</p>
      <p>{product.newPrice}</p>
      <p>{quantity}x</p>
      <p>{totalPrice}</p> {/* Display total price */}
    </div>
  );
};

export default ListProducts;
