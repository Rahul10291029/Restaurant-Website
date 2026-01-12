// ===============================
// Server.js (PRODUCTION READY)
// ===============================

require("dotenv").config();

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
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ===============================
// ✅ CORS CONFIG (FINAL)
// ===============================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://restaurant-web2025.netlify.app",
      "https://kreuzpintli-swagat.ch",
      "https://www.kreuzpintli-swagat.ch",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ===============================
// ✅ Middleware
// ===============================
app.use(express.json());

// ===============================
// ✅ Static uploads
// ===============================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===============================
// ✅ Health check route
// ===============================
app.get("/", (req, res) => {
  res.status(200).json({
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

  const uploadsDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log("📂 uploads folder created");
  }
});
