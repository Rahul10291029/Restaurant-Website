// Routes/AuthRoute.js
const express = require('express');
const router = express.Router();
const { register, login, verifyOtp } = require('../Controller/AuthController');

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);

module.exports = router;
