// saleRoutes.js
const express = require('express');
const router = express.Router();
const SaleEvent = require('../models/SaleEvent');
const Email = require('../models/Email');  // Add this import to reference the Email model
const { sendEmail } = require('../assets/emailService');   

router.get('/', async (req, res) => {  
  try {
    const events = await SaleEvent.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sale events' });
  }
});

router.post('/', async (req, res) => {
  const { name, description } = req.body;

  try {
    // Create the new sale event
    const newEvent = new SaleEvent({ name, description });
    await newEvent.save();

    // Fetch all emails from the database
    const emails = await Email.find();  // Assuming you have an Email model that stores email addresses

    // Send email to each recipient
    emails.forEach(async (emailDoc) => {
      const email = emailDoc.email;  // Adjust this to match the field name in your Email model
      const subject = `New Sale Event: ${name}`;
      const text = `Hello, there is a new sale event: ${name}. Description: ${description}`;

      // Send the email
      await sendEmail(email, subject, text);
    });

    res.status(201).json(newEvent);  // Send response with new event
  } catch (error) {
    console.error('Error creating sale event and sending email:', error);
    res.status(500).json({ message: 'Error creating sale event and sending email' });
  }
});

module.exports = router;
