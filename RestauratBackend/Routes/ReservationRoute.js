const express = require("express");
const router = express.Router();
const Reservation = require("../Model/Reservation");

/**
 * ✅ CREATE A NEW RESERVATION
 * POST /api/reservations
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, special } = req.body;

    // ✅ Basic validation (extra safety)
    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const newReservation = new Reservation({
      name,
      email,
      phone,
      date,
      time,
      guests,
      special,
    });

    const savedReservation = await newReservation.save();

    return res.status(201).json({
      success: true,
      message: "Reservation saved successfully",
      reservation: savedReservation,
    });

  } catch (error) {
    console.error("❌ Error saving reservation:", error);

    // ✅ Handle Mongoose validation errors properly
    if (error.name === "ValidationError") {
      const errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

/**
 * ✅ GET ALL RESERVATIONS
 * GET /api/reservations
 * (For admin panel / browser testing)
 */
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: reservations.length,
      reservations,
    });

  } catch (error) {
    console.error("❌ Error fetching reservations:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reservations",
    });
  }
});

module.exports = router;
