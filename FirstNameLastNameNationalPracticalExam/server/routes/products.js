const express = require('express');
const { protect } = require('../middleware/auth');
const Product = require('../models/Product');
const ProductIn = require('../models/ProductIn');
const ProductOut = require('../models/ProductOut');
const ExcelJS = require('exceljs');

const router = express.Router();

// @route   POST /api/products
// @desc    Add a new product
router.post('/', protect, async (req, res) => {
  try {
    const { productCode, productName } = req.body;

    // Check if product exists
    let product = await Product.findOne({ productCode });
    if (product) {
      return res.status(400).json({ message: 'Product already exists' });
    }

    // Create new product
    product = new Product({ productCode, productName });
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Product code must be unique' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/products
// @desc    Get all products
router.get('/', protect, async (req, res) => {
  try {
    const products = await Product.find().sort({ productName: 1 });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/products/:id
// @desc    Get a single product
router.get('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
router.put('/:id', protect, async (req, res) => {
  try {
    const { productCode, productName } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (productCode && productCode !== product.productCode) {
      const existingProduct = await Product.findOne({ productCode });
      if (existingProduct) {
        return res.status(400).json({ message: 'Product code already exists' });
      }
      product.productCode = productCode;
    }

    if (productName) {
      product.productName = productName;
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Product code must be unique' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await ProductIn.deleteMany({ productCode: product.productCode });
    await ProductOut.deleteMany({ productCode: product.productCode });
    await product.remove();

    res.json({ message: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/products/stock-in
// @desc    Add stock in
router.post('/stock-in', protect, async (req, res) => {
  try {
    const { productCode, quantity, uniquePrice } = req.body;

    // Check if product exists
    const product = await Product.findOne({ productCode });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const stockIn = new ProductIn({
      productCode,
      quantity,
      uniquePrice,
      totalPrice: quantity * uniquePrice
    });

    await stockIn.save();
    res.status(201).json(stockIn);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/products/stock-out
// @desc    Add stock out
router.post('/stock-out', protect, async (req, res) => {
  try {
    const { productCode, quantity, uniquePrice } = req.body;

    // Check if product exists
    const product = await Product.findOne({ productCode });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if enough stock is available
    const stockInTotal = await ProductIn.aggregate([
      { $match: { productCode } },
      { $group: { _id: null, total: { $sum: '$quantity' } } }
    ]);

    const stockOutTotal = await ProductOut.aggregate([
      { $match: { productCode } },
      { $group: { _id: null, total: { $sum: '$quantity' } } }
    ]);

    const availableStock = (stockInTotal[0]?.total || 0) - (stockOutTotal[0]?.total || 0);
    if (availableStock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const stockOut = new ProductOut({
      productCode,
      quantity,
      uniquePrice,
      totalPrice: quantity * uniquePrice
    });

    await stockOut.save();
    res.status(201).json(stockOut);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/products/report
// @desc    Get stock status report
router.get('/report', protect, async (req, res) => {
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
    
    // Create Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Stock Status');
    
    // Add headers
    worksheet.columns = [
      { header: 'Product Code', key: 'productCode', width: 15 },
      { header: 'Product Name', key: 'productName', width: 20 },
      { header: 'Stock In', key: 'stockIn', width: 10 },
      { header: 'Stock Out', key: 'stockOut', width: 10 },
      { header: 'Current Stock', key: 'currentStock', width: 15 }
    ];
    
    // Add data
    stockStatus.forEach(item => {
      worksheet.addRow({
        productCode: item.productCode,
        productName: item.productName,
        stockIn: item.stockIn,
        stockOut: item.stockOut,
        currentStock: item.currentStock
      });
    });
    
    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=stock_status_report.xlsx');
    
    // Write workbook to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;