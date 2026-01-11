const nodemailer = require('nodemailer');

// Create a reusable transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'rahul.1029.123@gmail.com',
    pass: process.env.EMAIL_PASS || 'fofl xuhg hrry tfev'
  },
  tls: {
    rejectUnauthorized: false
  }
});

// OTP Email
const sendOtpMail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'rahul.1029.123@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4CAF50;">Your OTP Code</h2>
        <p>Please use the following OTP to verify your account:</p>
        <div style="background: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="margin: 0; color: #333;">${otp}</h1>
        </div>
        <p>This OTP will expire in 10 minutes.</p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

// Contact Form Email
const sendContactEmail = async ({ name, email, message }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'rahul.1029.123@gmail.com',
    to: process.env.RECEIVING_EMAIL || 'rahul.1029.123@gmail.com',
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4CAF50;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f4f4f4; padding: 20px; margin: 20px 0;">
          <p style="margin: 0;">${message}</p>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendOtpMail, sendContactEmail };