const nodemailer = require('nodemailer');

// Set up your SMTP transporter (using Gmail as an example)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail or any other service you want
  auth: {
    user: process.env.EMAIL_USER,  // Email address from which emails will be sent
    pass: process.env.EMAIL_PASS,  // Password or application-specific password for Gmail
  },
});

// Function to send an email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender email address
    to,  // Recipient email address
    subject,  // Subject of the email
    text,  // Body of the email (plain text)
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
