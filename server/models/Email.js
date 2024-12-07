const mongoose = require("mongoose");

// Define the schema for the email
const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // Ensures no duplicate emails
    lowercase: true,  // Stores emails in lowercase
    trim: true,  // Removes extra spaces
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Email validation regex
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create the model from the schema
const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
