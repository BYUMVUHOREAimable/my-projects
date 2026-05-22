const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addStockIn,
  addStockOut
} = require('../controllers/productController');

// Product routes
router.get('/', auth, getProducts);
router.get('/:id', auth, getProduct);
router.post('/', auth, createProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

// Stock management routes
router.post('/:id/stock-in', auth, addStockIn);
router.post('/:id/stock-out', auth, addStockOut);

module.exports = router; 