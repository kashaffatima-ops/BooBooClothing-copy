const express = require('express');
const staffController = require('../controllers/staffController');
const verifyToken = require('../middlewares/authMiddlewares'); // Import the middleware
const router = express.Router();
const { getStaffByEmail } = require('../controllers/staffController');

// Public routes
router.post('/login', staffController.loginStaff);

// Protected routes
router.post('/',  staffController.createStaff);
router.get('/',  staffController.getAllStaff);
router.put('/:id',  staffController.updateStaff);
router.delete('/:id',  staffController.deleteStaff);
router.get('/getstaff', getStaffByEmail);

module.exports = router;
