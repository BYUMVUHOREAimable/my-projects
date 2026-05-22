const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Register a new shopkeeper
// @access  Public
router.post('/register', authController.register);

// @route   POST /api/auth/login
// @desc    Login shopkeeper
// @access  Public
router.post('/login', authController.login);

// @route   GET /api/auth/me
// @desc    Get current logged in shopkeeper
// @access  Private
router.get('/me', auth, authController.getMe);

module.exports = router;