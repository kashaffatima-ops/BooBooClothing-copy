const Staff = require('../models/Staff');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  const { email, password, role } = req.body;

  // Check if all required fields are provided
  if (!email || !password || !role) {
    return res.status(400).json({ message: "Email, password, and role are required." });
  }

  try {
    // Check if the email already exists
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({ message: "Staff member already exists." });
    }

    // Create a new staff member
    const newStaff = new Staff({
      email,
      password,
      role, // Role will come from the form now
    });

    // Save the new staff member to the database
    await newStaff.save();

    res.status(201).json({
      message: "Staff member created successfully",
      staff: {
        email: newStaff.email,
        role: newStaff.role,
      },
    });
  } catch (error) {
    console.error("Error creating staff member:", error);
    res.status(500).json({ message: "Error creating staff member", error: error.message });
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

module.exports = {
  loginStaff,
  createStaff,
  getAllStaff,
  updateStaff,
  deleteStaff,
};
