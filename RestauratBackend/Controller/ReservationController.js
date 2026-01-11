// Controller/ReservationController.js
const { validationResult } = require('express-validator');
const Reservation = require('../Model/Reservation'); // <-- Import your Mongoose model

// Remove the in-memory array
// let reservations = [];

exports.createReservation = async (req, res) => { // Make it async
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, date, time, guests, specialRequests } = req.body;

  try {
    const newReservation = new Reservation({ // Create a new Mongoose document
      name,
      email,
      phone,
      date,
      time,
      guests,
      specialRequests
    });

    await newReservation.save(); // <-- Save the document to MongoDB

    res.status(201).json({
      message: 'Reservation created successfully',
      reservation: newReservation
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Server error: Could not create reservation.' });
  }
};

exports.getAllReservations = async (req, res) => { // Make it async
  try {
    const reservations = await Reservation.find(); // <-- Fetch all reservations from MongoDB
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Server error: Could not fetch reservations.' });
  }
};