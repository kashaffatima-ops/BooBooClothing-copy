import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Cart.css'

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login"; // Redirect to login if no token
      return;
    }

    // Fetch user ID using the token
    axios
      .post("http://localhost:5000/api/auth/findByToken", { token })
      .then((response) => {
        const userId = response.data.userId;
        // Fetch cart items for the user
        return axios.get(`http://localhost:5000/api/cart/view?userId=${userId}`);
      })
      .then((response) => {
        const items = response.data.cart;
        setCartItems(items);

        // Calculate total price
        const totalPrice = items.reduce((sum, item) => {
          return sum + item.itemId.newPrice * item.quantity;
        }, 0);
        setTotal(totalPrice);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  const removeItemFromCart = (itemId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login"; // Redirect to login if no token
      return;
    }

    // Get user ID and remove item from cart
    axios
      .post("http://localhost:5000/api/auth/findByToken", { token })
      .then((response) => {
        const userId = response.data.userId;
        return axios.delete(`http://localhost:5000/api/cart/remove/${itemId}`, {
          data: { userId },
        });
      })
      .then(() => {
        // Remove item from state
        setCartItems((prevItems) => prevItems.filter((item) => item.itemId._id !== itemId));
      })
      .catch((error) => {
        console.error("Error removing item:", error);
      });
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((cartItem) => (
              <li key={cartItem.itemId._id} className="cart-item">
                <img
                  src={`http://localhost:5000/${cartItem.itemId.imageName}`}
                  alt={cartItem.itemId.Name}
                  width={50}
                  height={50}
                />
                <div>
                  <p>{cartItem.itemId.Name}</p>
                  <p>Price: PKR {cartItem.itemId.newPrice}</p>
                  <p>Quantity: {cartItem.quantity}</p>
                  <button onClick={() => removeItemFromCart(cartItem.itemId._id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="total">
            <h3>Total: PKR {total.toFixed(2)}</h3>
            <Link 
              to="/checkout" 
              state={{ total, cartItems }} // Passing state to the Checkout page
            >
              <button className="Checkout">Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
