// createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./Model/Admin');

// connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/restaurant')
  .then(async () => {
    const email = 'admin@example.com';     // you can change this
    const password = 'admin123';           // and this too

    const hashedPassword = await bcrypt.hash(password, 10);

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log('⚠️ Admin already exists');
    } else {
      const newAdmin = new Admin({ email, password: hashedPassword });
      await newAdmin.save();
      console.log('✅ Admin created:', email);
    }

    mongoose.disconnect();
  })
  .catch(err => console.error('❌ Error:', err));
