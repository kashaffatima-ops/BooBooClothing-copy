const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// @desc Register a new user
// @route POST /api/auth/register
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields (name, email, password) are required.' });
    }
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Debug the password
      console.log('Password received:', password);
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        cart: [],
        orders: [],
      });
  
      const savedUser = await newUser.save();
  
      // Generate JWT
      const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error('Registration Error:', error); // Log the error in the console for debugging
      res.status(500).json({ message: 'Error registering user', error: error.message || error });
    }
  };
  
  

// @desc Login user
// @route POST /api/auth/login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Send the token in the response
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  };