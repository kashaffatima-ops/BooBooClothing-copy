const express = require('express');
const Email = require('../models/Email'); // Import the email model
const router = express.Router();

// Route to add a new email
router.post('/add', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Create a new email document and save it to the database
    const newEmail = new Email({ email });
    await newEmail.save();
    res.status(201).json({ message: "Email added successfully!" });
  } catch (error) {
    // Check for duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "An error occurred while adding the email", details: error.message });
  }
});

module.exports = router;
