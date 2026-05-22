const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addStockIn,
  addStockOut,
} = require('../controllers/productController');

router.get('/', auth, getProducts);
router.get('/:id', auth, getProduct);
router.post('/', auth, addProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

// ✅ Add these if missing:
router.post('/stock-in', auth, addStockIn);
router.post('/stock-out', auth, addStockOut);

module.exports = router;
