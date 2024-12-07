const express = require('express');
const { createOrder, viewOrders, viewOrderById, updateOrderStatus } = require('../controllers/orderController');
const router = express.Router();

// Create a new order
router.post('/create', createOrder);

// View all orders for a user
router.get('/view', viewOrders);

// View a specific order by ID
router.get('/:orderId', viewOrderById);

// Update order status (e.g., shipped, delivered)
router.put('/:orderId/status', updateOrderStatus);

module.exports = router;
