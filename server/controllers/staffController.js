const Staff = require('../models/Staff');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const loginStaff = async (req, res) => {
  console.log('Login request received'); 
  const { email, password } = req.body;

  try {
    // Find the staff member by email
    const staffMember = await Staff.findOne({ email });

    if (!staffMember) {
      console.log('Staff not found');
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Log the hashed password and compare with the provided password
    console.log('Stored password:', staffMember.password);  // Logs the hashed password
    const isMatch = await bcrypt.compare(password, staffMember.password);
    
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: staffMember._id, role: staffMember.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token,
      user: {
        id: staffMember._id,
        email: staffMember.email,
        role: staffMember.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};

const createStaff = async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password || !role || !phone) {
    return res.status(400).json({ 
      message: "Name, email, password, role, and phone are required." 
    });
  }

  try {
    // Check if the email already exists
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({ message: "Staff member already exists." });
    }

    // Create a new staff member
    const newStaff = new Staff({
      name,
      email,
      password,
      role,
      phone,
    });

    // Save the new staff member to the database
    await newStaff.save();

    res.status(201).json({
      message: "Staff member created successfully",
      staff: {
        id: newStaff._id,
        name: newStaff.name,
        email: newStaff.email,
        role: newStaff.role,
        phone: newStaff.phone,
      },
    });
  } catch (error) {
    console.error("Error creating staff member:", error);
    res.status(500).json({ 
      message: "Error creating staff member", 
      error: error.message 
    });
  }
};


const getAllStaff = async (req, res) => {
  try {
    const staffMembers = await Staff.find();
    res.status(200).json({ success: true, data: staffMembers });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateStaff = async (req, res) => {
  const { name, position, email, phone } = req.body;

  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      { name, position, email, phone },
      { new: true }
    );
    if (!staff) {
      return res.status(404).json({ success: false, error: 'Staff member not found' });
    }
    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
      return res.status(404).json({ success: false, error: 'Staff member not found' });
    }
    res.status(200).json({ success: true, data: 'Staff member deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getStaffByEmail = async (req, res) => {
  const { email } = req.params;  // Get email from the request parameters

  // Check if the email is provided
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    // Find the staff member by email
    const staffMember = await Staff.findOne({ email });

    // If no staff member found, return a 404 error
    if (!staffMember) {
      return res.status(404).json({ message: 'Staff member not found.' });
    }

    // Return the staff member's details
    res.status(200).json({ success: true, data: staffMember });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};


module.exports = {
  loginStaff,
  createStaff,
  getAllStaff,
  updateStaff,
  deleteStaff,
  getStaffByEmail,
};
