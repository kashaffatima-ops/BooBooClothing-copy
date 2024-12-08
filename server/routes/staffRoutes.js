const express = require('express');
const staffController = require('../controllers/staffController');
const verifyToken = require('../middlewares/authMiddlewares'); // Import the middleware
const router = express.Router();

// Public routes
router.post('/login', staffController.loginStaff);

// Protected routes
router.post('/', verifyToken, staffController.createStaff);
router.get('/', verifyToken, staffController.getAllStaff);
router.put('/:id', verifyToken, staffController.updateStaff);
router.delete('/:id', verifyToken, staffController.deleteStaff);

module.exports = router;
