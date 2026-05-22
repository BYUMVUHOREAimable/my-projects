const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getStockStatus,
  getStockMovements,
  downloadStockStatus,
  downloadStockMovements
} = require('../controllers/stockController');

// @route   GET /api/stock/status
// @desc    Get current stock status
// @access  Private
router.get('/status', auth, getStockStatus);

// @route   GET /api/stock/movements
// @desc    Get stock movement history
// @access  Private
router.get('/movements', auth, getStockMovements);

// @route   GET /api/stock/status/download
// @desc    Download stock status as CSV
// @access  Private
router.get('/status/download', auth, downloadStockStatus);

// @route   GET /api/stock/movements/download
// @desc    Download stock movements as CSV
// @access  Private
router.get('/movements/download', auth, downloadStockMovements);

module.exports = router; 