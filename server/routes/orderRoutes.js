const express = require('express');
const { createOrder, viewOrders, viewOrderById, updateOrderStatus,viewAllOrders,getCustomer } = require('../controllers/orderController');
const router = express.Router();
const { getProductsByIds } = require('../controllers/orderController');

// View all orders for staff
router.get('/viewAll', viewAllOrders);

//get a specific customer by id
router.get('/getCustomer/:userId', getCustomer);

//fetch all products of the order
router.post('/byIds',getProductsByIds);

// Create a new order
router.post('/create', createOrder);

// View all orders for a user
router.get('/view', viewOrders);


// View a specific order by ID
router.get('/id/:orderId', viewOrderById);

// Update order status (e.g., shipped, delivered)
router.put('/updateStatus/:orderId', updateOrderStatus);



module.exports = router;
