const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/User');
const sendOtpMail = require('../utils/sendOtpMail');
const redisClient = require('../utils/sendOtpMail');

// REGISTER
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ success: false, message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.json({ success: true, message: 'User registered successfully' });
  } catch {
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: 'Incorrect password' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redisClient.setEx(`otp:${normalizedEmail}`, 300, otp); // expires in 5 min
    await sendOtpMail(normalizedEmail, otp);

    res.json({ success: true, message: 'OTP sent to email' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login error', error: err.message });
  }
};

// VERIFY OTP
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const normalizedEmail = email.toLowerCase();

  try {
    const storedOtp = await redisClient.get(`otp:${normalizedEmail}`);
    if (!storedOtp) return res.json({ success: false, message: 'OTP expired or not found' });

    if (storedOtp !== otp) return res.json({ success: false, message: 'Invalid OTP' });

    await redisClient.del(`otp:${normalizedEmail}`);

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.json({ success: false, message: 'User not found' });

    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1d' });
    res.json({ success: true, message: 'OTP verified', token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'OTP verification error', error: err.message });
  }
};

module.exports = { registerUser, loginUser, verifyOtp };
