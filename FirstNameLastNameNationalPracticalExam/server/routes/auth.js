const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const auth = require('../middleware/auth');

// Register route (Public)
router.post('/register', register);

// Login route (Public)
router.post('/login', login);

// Get current logged-in shopkeeper route (Private)
router.get('/me', auth, getMe);

module.exports = router;
