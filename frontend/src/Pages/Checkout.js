import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import './Checkout.css';

const stripePromise = loadStripe("your-stripe-public-key"); // Replace with your Stripe public key

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login"; // Redirect to login if no token
      return;
    }

    // Fetch user ID from the token
    const fetchUserId = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/findByToken", { token });
        const fetchedUserId = response.data.userId;
        setUserId(fetchedUserId);
        
        // Fetch cart data for the user once we have the user ID
        fetchCartData(fetchedUserId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
        alert("Error fetching user details.");
      }
    };

    // Fetch user ID
    fetchUserId();
  }, []);

  const fetchCartData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/view?userId=${userId}`);
      setCartItems(response.data.cart);
      let total = 0;
      response.data.cart.forEach(item => {
        total += item.itemId.newPrice * item.quantity;  // Use itemId.newPrice for price calculation
      });
      setTotalAmount(total);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      alert("Error fetching cart items.");
    }
  };
  

  const handleCheckout = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    const orderData = {
        userId,
        items: cartItems.map(item => ({
          itemId: item.itemId._id,  // Correct way to access item ID
          quantity: item.quantity,
        })),
        totalAmount,
      };
      

    try {
      // Create order via API
      const orderResponse = await axios.post("http://localhost:5000/api/orders/create", orderData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      //remove the items from the orders
      for (const item of cartItems) {
        await axios.delete(`http://localhost:5000/api/cart/remove/${item.itemId._id}`, {
          data: { userId }, // Send userId in the body for authentication
        });
      }

      if (paymentMethod === "stripe") {
        handleStripePayment(orderResponse.data.order);
      } else {
        handleCODPayment(orderResponse.data.order);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("There was an error while placing the order.");
    }
  };

  const handleStripePayment = async (order) => {
    alert("Stripe is not availble as of yet. Sorry for the inconvinience");

  };

  const handleCODPayment = (order) => {
    // For Cash on Delivery, simply place the order and show a success message
    alert("Your order has been placed successfully with Cash on Delivery!");
    // Optionally, navigate to a confirmation page

  };

  if (!userId) {
    return <p>Loading user details...</p>; // Show loading message while fetching user ID
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
  
      {/* Payment Method Section */}
      <div className="payment-method">
        <label>
          <input
            type="radio"
            name="payment-method"
            value="stripe"
            onChange={() => setPaymentMethod("stripe")}
          />
          Pay with Stripe
        </label>
        <label>
          <input
            type="radio"
            name="payment-method"
            value="cod"
            onChange={() => setPaymentMethod("cod")}
          />
          Cash on Delivery
        </label>
      </div>
  
      {/* Order Summary Section */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul id="cart-items">
          {cartItems.map((item) => (
            <li key={item._id}> {/* Using item._id for the key */}
              {item.itemId.Name} x {item.quantity} - PKR {item.itemId.newPrice}
            </li>
          ))}
        </ul>
        <div className="total">
          Total: <span id="total-amount">PKR {totalAmount}</span>
        </div>
      </div>
  
      <button onClick={handleCheckout} className="Checkoutbt">
        Proceed to Checkout
      </button>
    </div>
  );
  
};

export default Checkout;
