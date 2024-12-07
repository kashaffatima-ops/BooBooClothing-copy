import React, { useState } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([
    { id: 1, name: 'Black Hoodie', price: 70.0, quantity: 1 },
    { id: 2, name: 'Sleeveless Shirt', price: 135.0, quantity: 1 },
  ]);
  const [shippingMethod, setShippingMethod] = useState('Free shipping'); // Default to free shipping
  const [shippingCost, setShippingCost] = useState(0);
  
  // Calculate Subtotal, Tax, Total
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const subtotal = calculateSubtotal();
  const total = subtotal + shippingCost;

  const handleQuantityChange = (id, newQuantity) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleShippingChange = (method) => {
    if (method === 'Free shipping') {
      setShippingMethod('Free shipping');
      setShippingCost(0);
    } else if (method === 'Flat rate') {
      setShippingMethod('Flat rate');
      setShippingCost(10);
    } else if (method === 'Pickup') {
      setShippingMethod('Pickup');
      setShippingCost(15);
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2>Shopping Cart</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>€{item.price}</td>
                <td>
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    min="1"
                  />
                </td>
                <td>€{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="cart-totals">
        <h2>Cart Totals</h2>
        <div>
          <strong>Subtotal: </strong>€{subtotal.toFixed(2)}
        </div>
        <div>
          <strong>Shipping:</strong>
          <select onChange={(e) => handleShippingChange(e.target.value)} value={shippingMethod}>
            <option value="Free shipping">Free shipping</option>
            <option value="Flat rate">Flat rate (€10)</option>
            <option value="Pickup">Pickup (€15)</option>
          </select>
        </div>
        <div>
          <strong>Total: </strong>€{total.toFixed(2)}
        </div>
        <button className="checkout-button">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
