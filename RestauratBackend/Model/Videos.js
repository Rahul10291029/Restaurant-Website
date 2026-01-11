
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  filename: String,     // video name like "164533.mp4"
  url: String,          // full URL path like "/uploads/164533.mp4"
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', videoSchema);
