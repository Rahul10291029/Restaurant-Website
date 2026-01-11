// ===============================
// Server.js (PRODUCTION READY)
// ===============================

require("dotenv").config(); // ✅ LOAD .env FIRST

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();

// ===============================
// ✅ MongoDB Connection (ATLAS)
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected successfully"))
  .catch((err) =>
    console.error("❌ MongoDB Atlas connection error:", err)
  );

// ===============================
// ✅ CORS CONFIG
// (dev + future production ready)
// ===============================
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Vite dev
      "http://127.0.0.1:5173"
      // later you will add: https://yourdomain.com
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
// ✅ Routes
// ===============================
const authRoutes = require("./Routes/userRoutes");
const reservationRoutes = require("./Routes/ReservationRoute");
const contactRoutes = require("./Routes/ContactRoute");

app.use("/api", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/contact", contactRoutes);

// ===============================
// ✅ Server Start
// ===============================
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  // Create uploads folder if not exists
  const uploadsDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log(`📂 'uploads' directory created at: ${uploadsDir}`);
  }
});
