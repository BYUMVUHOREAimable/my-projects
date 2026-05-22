const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getStockStatus,
  getStockMovements,
  downloadStockReport
} = require('../controllers/reportController');

// All routes are protected and require authentication
router.use(protect);

// Get stock status
router.get('/stock-status', getStockStatus);

// Get stock movements with optional date filtering
router.get('/stock-movements', getStockMovements);

// Download stock report
router.get('/download', downloadStockReport);

module.exports = router; 