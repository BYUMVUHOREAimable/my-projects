const jwt = require('jsonwebtoken');
const Shopkeeper = require('../models/Shopkeeper');

const auth = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Extract token by removing "Bearer " prefix
    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Retrieve shopkeeper from token, excluding the password field for security
    const shopkeeper = await Shopkeeper.findById(decoded.id).select('-password');

    if (!shopkeeper) {
      return res.status(401).json({ message: 'Shopkeeper not found or token is invalid' });
    }

    // Attach the shopkeeper object to the request for later use
    req.shopkeeper = shopkeeper;
    next();

  } catch (err) {
    console.error('Auth middleware error:', err);

    // Specific error handling for JWT issues
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }

    // Generic server error handling
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
};

module.exports = { auth };
