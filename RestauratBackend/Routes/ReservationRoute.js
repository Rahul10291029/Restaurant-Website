const express = require('express');
const router = express.Router();
const Reservation = require('../Model/Reservation'); // Your Mongoose model

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, special } = req.body;

    // Optional: basic manual check (can skip if relying on Mongoose)
    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const newReservation = new Reservation({
      name,
      email,
      phone,
      date,
      time,
      guests,
      special
    });

    const saved = await newReservation.save();

    res.status(201).json({
      message: 'Reservation saved successfully',
      reservation: saved
    });

  } catch (error) {
    console.error('❌ Error saving to DB:', error);

    // ✅ Send detailed validation errors back to the frontend
    if (error.name === 'ValidationError') {
      const errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }

      return res.status(400).json({
        message: 'Validation failed',
        errors
      });
    }

    // Generic 500 response fallback
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
