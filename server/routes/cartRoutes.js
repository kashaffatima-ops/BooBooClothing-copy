const express = require('express');
const { addToCart, removeFromCart, viewCart } = require('../controllers/cartController');

const router = express.Router();

// Add item to cart
router.post('/add', addToCart);

// Remove item from cart
router.delete('/remove/:itemId', removeFromCart);

// View items in the cart
router.get('/view', viewCart);

module.exports = router;
