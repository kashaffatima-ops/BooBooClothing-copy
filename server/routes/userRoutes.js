const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const { getUserProfile, updatePassword } = require('../controllers/userController');

const router = express.Router();

// @route POST /api/auth/register
// @desc Register a new user
router.post(
  '/register',
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  registerUser
);

// @route POST /api/auth/login
// @desc Login user
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').not().isEmpty().withMessage('Password is required'),
  ],
  loginUser
);

router.post('/findByToken', async (req, res) => {
  const { token } = req.body; // JWT token sent in the request body

  try {
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // Decode the JWT token to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the same secret as in the login function
    const userId = decoded.id; // Extract the user ID from the decoded token
    console.log("Decoded token:", decoded);
    if (!userId) {
      return res.status(400).json({ error: 'Invalid token' });
    }
    console.log("user id incoming is:", userId);
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Error processing token', details: error.message });
  }
});

router.get('/profile', getUserProfile);

// @route POST /api/auth/update-password
// @desc Update user password
router.post(
  '/update-password',
  [
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  updatePassword
);

module.exports = router;
