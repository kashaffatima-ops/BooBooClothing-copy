const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/userController');

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

module.exports = router;
