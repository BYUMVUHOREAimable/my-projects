const jwt = require('jsonwebtoken');
const Shopkeeper = require('../models/Shopkeeper');

// Register a new shopkeeper
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if shopkeeper exists
    const shopkeeperExists = await Shopkeeper.findOne({ username });
    if (shopkeeperExists) {
      return res.status(400).json({ message: 'Shopkeeper already exists' });
    }

    // Create new shopkeeper
    const shopkeeper = new Shopkeeper({
      username,
      password
    });

    // Save shopkeeper
    await shopkeeper.save();

    // Generate token
    const token = shopkeeper.generateAuthToken();

    res.status(201).json({
      token,
      shopkeeper: {
        id: shopkeeper._id,
        username: shopkeeper.username
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    if (err.message === 'JWT_SECRET is not defined') {
      return res.status(500).json({ message: 'Server configuration error' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Login shopkeeper
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if shopkeeper exists
    const shopkeeper = await Shopkeeper.findOne({ username });
    if (!shopkeeper) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await shopkeeper.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = shopkeeper.generateAuthToken();

    res.json({
      token,
      shopkeeper: {
        id: shopkeeper._id,
        username: shopkeeper.username
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    if (err.message === 'JWT_SECRET is not defined') {
      return res.status(500).json({ message: 'Server configuration error' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current logged in shopkeeper
const getMe = async (req, res) => {
  try {
    const shopkeeper = await Shopkeeper.findById(req.shopkeeper.id).select('-password');
    if (!shopkeeper) {
      return res.status(404).json({ message: 'Shopkeeper not found' });
    }
    res.json(shopkeeper);
  } catch (err) {
    console.error('Get me error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  getMe
};
