const express = require('express');
const { protect } = require('../middleware/auth');
const Product = require('../models/Product');
const ProductIn = require('../models/ProductIn');
const ProductOut = require('../models/ProductOut');

const router = express.Router();

// @route   GET /api/reports/stock-status
// @desc    Get stock status report
router.get('/stock-status', protect, async (req, res) => {
  try {
    // Get all products
    const products = await Product.find();
    
    // Get all stock in and out
    const stockIn = await ProductIn.aggregate([
      { $group: { _id: "$productCode", total: { $sum: "$quantity" } } }
    ]);
    
    const stockOut = await ProductOut.aggregate([
      { $group: { _id: "$productCode", total: { $sum: "$quantity" } } }
    ]);
    
    // Calculate current stock
    const stockStatus = products.map(product => {
      const inTotal = stockIn.find(item => item._id === product.productCode)?.total || 0;
      const outTotal = stockOut.find(item => item._id === product.productCode)?.total || 0;
      
      return {
        productCode: product.productCode,
        productName: product.productName,
        stockIn: inTotal,
        stockOut: outTotal,
        currentStock: inTotal - outTotal
      };
    });
    
    res.json(stockStatus);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/reports/stock-movements
// @desc    Get stock movements report
router.get('/stock-movements', protect, async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;
    let query = {};
    
    // Date filter
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    let movements;
    if (type === 'in') {
      movements = await ProductIn.find(query).populate('productCode', 'productName');
    } else if (type === 'out') {
      movements = await ProductOut.find(query).populate('productCode', 'productName');
    } else {
      const inMovements = await ProductIn.find(query).populate('productCode', 'productName');
      const outMovements = await ProductOut.find(query).populate('productCode', 'productName');
      movements = [...inMovements, ...outMovements];
    }
    
    res.json(movements);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;