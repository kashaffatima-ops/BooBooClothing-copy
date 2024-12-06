const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const clothingRoutes = require('./routes/clothingRoutes'); // Adjust path if needed

dotenv.config();
connectDB();
const cors = require('cors');


const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors());

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Register API routes
app.use('/api/clothing', clothingRoutes); // Clothing items routes

// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not Found' });
});

module.exports = app;
