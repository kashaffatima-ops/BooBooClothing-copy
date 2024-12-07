import React, { useState } from 'react';
import axios from 'axios'; // Import axios to make HTTP requests
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');  // State to store the email input
  const [message, setMessage] = useState(''); // State to display messages (success or error)
  const [loading, setLoading] = useState(false); // State to manage loading state

  // Handle input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission (when the "Subscribe" button is clicked)
  const handleSubscribe = async () => {
    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/newsletter/add', { email });
      setMessage(response.data.message);  // Success message from the backend
      setEmail('');  // Clear the input field after successful subscription
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred. Please try again.'); // Error message from the backend
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='newsletter'>
      <h1> Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
        <input
          type="email"
          placeholder="Your Email id"
          value={email} // Bind the input value to the state
          onChange={handleEmailChange} // Update the state on input change
        />
        <button onClick={handleSubscribe} disabled={loading}>  {/* Button click handler */}
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>

      {/* Display success or error message */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Newsletter;
