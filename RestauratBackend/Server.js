const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();

// ✅ MongoDB Connection
const MONGODB_URI = 'mongodb://localhost:27017/jasminrestro';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Corrected CORS Setup for Vite Dev Server on port 5173
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes = require('./Routes/userRoutes');
app.use('/api', authRoutes);

const reservationRoutes = require('./Routes/ReservationRoute');
app.use('/api/reservations', reservationRoutes);

const contactRoutes = require('./Routes/ContactRoute');
app.use('/api/contact', contactRoutes);

// ✅ Server start and create 'uploads' folder if not exists
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  const uploadsDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log(`📂 'uploads' directory created at: ${uploadsDir}`);
  }
});
