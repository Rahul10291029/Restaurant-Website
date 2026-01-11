const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name must be no longer than 50 characters'],
    match: [/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@gmail\.com$/, 'Only Gmail addresses are allowed']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[6-9][0-9]{9}$/, 'Phone number must be a valid 10-digit Indian mobile number']
  },
  date: {
    type: String,
    required: [true, 'Reservation date is required'],
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format']
  },
  time: {
    type: String,
    required: [true, 'Reservation time is required'],
    match: [/^\d{2}:\d{2}$/, 'Time must be in HH:MM format']
  },
  guests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: [1, 'At least one guest is required'],
    max: [20, 'Maximum 20 guests allowed']
  },
  special: {
    type: String,
    trim: true,
    maxlength: [100, 'Special request must be under 100 characters'],
    default: ''
  }
});

module.exports = mongoose.model('Reservation', reservationSchema);
