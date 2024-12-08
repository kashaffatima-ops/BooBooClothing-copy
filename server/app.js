const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const clothingRoutes = require('./routes/clothingRoutes'); // Adjust path if needed
const userRoutes = require('./routes/userRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const emailRoutes = require('./routes/emailRoutes')
const staffRoutes = require('./routes/staffRoutes')
const salesRoutes = require('./routes/saleRoutes')
dotenv.config();
connectDB();
const cors = require('cors');


const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors());

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json()); // This ensures the body is parsed as JSON

// Register API routes
app.use('/api/clothing', clothingRoutes); // Clothing items routes
app.use('/api/auth', userRoutes);//login and registeration routes for customer
app.use('/api/cart',cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/newsletter', emailRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/sale-events', salesRoutes);

// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not Found' });
});

module.exports = app;
