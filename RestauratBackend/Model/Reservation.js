const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name must be no longer than 50 characters"],
      match: [/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Invalid email address",
      ],
    },

    // 📞 International phone support
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: function (value) {
          /*
            Expected formats:
            +919876543210  (India)
            +41791234567   (Switzerland - CH)
            +33612345678   (France)
            +4915123456789 (Germany)
          */

          const phoneRegex =
            /^\+(91\d{10}|41\d{9}|33\d{9}|49\d{10,11})$/;

          return phoneRegex.test(value);
        },
        message:
          "Invalid phone number. Use valid country code and number.",
      },
    },

    date: {
      type: String,
      required: [true, "Reservation date is required"],
      match: [
        /^\d{4}-\d{2}-\d{2}$/,
        "Date must be in YYYY-MM-DD format",
      ],
    },

    time: {
      type: String,
      required: [true, "Reservation time is required"],
      match: [
        /^\d{2}:\d{2}$/,
        "Time must be in HH:MM format",
      ],
    },

    guests: {
      type: Number,
      required: [true, "Number of guests is required"],
      min: [1, "At least one guest is required"],
      max: [20, "Maximum 20 guests allowed"],
    },

    // 🔄 Match frontend field
    specialRequests: {
      type: String,
      trim: true,
      maxlength: [200, "Special request must be under 200 characters"],
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
