// ===============================
// Server.js (PRODUCTION READY)
// ===============================

require("dotenv").config(); // ✅ Load .env first

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();

// ===============================
// ✅ MongoDB Connection
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected successfully"))
  .catch((err) =>
    console.error("❌ MongoDB Atlas connection error:", err)
  );

// ===============================
// ✅ CORS CONFIG (IMPORTANT PART)
// ===============================
app.use(
  cors({
    origin: [
      // Local development
      "http://localhost:5173",
      "http://127.0.0.1:5173",

      // Netlify default domain
      "https://restaurant-web2025.netlify.app",

      // Custom domains
      "https://kreuzpintli-swagat.ch",
      "https://www.kreuzpintli-swagat.ch",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ===============================
// ✅ Middlewares
// ===============================
app.use(express.json());

// ===============================
// ✅ Static uploads folder
// ===============================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===============================
// ✅ Health Check Route
// ===============================
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Restaurant backend is running 🚀",
  });
});

// ===============================
// ✅ Routes
// ===============================
const authRoutes = require("./Routes/userRoutes");
const reservationRoutes = require("./Routes/ReservationRoute");
const contactRoutes = require("./Routes/ContactRoute");

app.use("/api", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/contact", contactRoutes);

// ===============================
// ✅ Start Server
// ===============================
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // Ensure uploads folder exists
  const uploadsDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log(`📂 'uploads' directory created at: ${uploadsDir}`);
  }
});
