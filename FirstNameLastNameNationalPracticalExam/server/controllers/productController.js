const Product = require('../models/Product');
const ProductIn = require('../models/ProductIn');
const ProductOut = require('../models/ProductOut');

// @desc    Get all products
// @route   GET /api/products
// @access  Private
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
exports.getProduct = async (req, res) => {
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
};

// @desc    Create product
// @route   POST /api/products
// @access  Private
exports.createProduct = async (req, res) => {
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
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
exports.updateProduct = async (req, res) => {
  try {
    const { productCode, productName } = req.body;

    // Check if product exists
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product
    product.productCode = productCode || product.productCode;
    product.productName = productName || product.productName;
    await product.save();

    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Product code must be unique' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete associated stock records
    await ProductIn.deleteMany({ productCode: product.productCode });
    await ProductOut.deleteMany({ productCode: product.productCode });

    // Delete the product
    await Product.deleteOne({ _id: req.params.id });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

// @desc    Add stock in
// @route   POST /api/products/:id/stock-in
// @access  Private
exports.addStockIn = async (req, res) => {
  try {
    const { quantity, uniquePrice } = req.body;
    
    // Validate input
    if (!quantity || !uniquePrice) {
      return res.status(400).json({ message: 'Quantity and unit price are required' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }

    if (uniquePrice <= 0) {
      return res.status(400).json({ message: 'Unit price must be greater than 0' });
    }

    // Find the product
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create stock in record
    const stockIn = new ProductIn({
      productCode: product.productCode,
      quantity: Number(quantity),
      uniquePrice: Number(uniquePrice),
      totalPrice: Number(quantity) * Number(uniquePrice)
    });

    // Save the record
    await stockIn.save();

    // Return the created record
    res.status(201).json({
      message: 'Stock added successfully',
      stockIn: {
        id: stockIn._id,
        productCode: stockIn.productCode,
        quantity: stockIn.quantity,
        uniquePrice: stockIn.uniquePrice,
        totalPrice: stockIn.totalPrice,
        date: stockIn.date
      }
    });
  } catch (err) {
    console.error('Add stock in error:', err);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    // Handle duplicate key errors
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Duplicate entry' });
    }

    // Handle other errors
    res.status(500).json({ 
      message: 'Error adding stock',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// @desc    Add stock out
// @route   POST /api/products/:id/stock-out
// @access  Private
exports.addStockOut = async (req, res) => {
  try {
    const { quantity, uniquePrice } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if enough stock is available
    const totalIn = await ProductIn.aggregate([
      { $match: { productCode: product.productCode } },
      { $group: { _id: null, total: { $sum: '$quantity' } } }
    ]);

    const totalOut = await ProductOut.aggregate([
      { $match: { productCode: product.productCode } },
      { $group: { _id: null, total: { $sum: '$quantity' } } }
    ]);

    const availableStock = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

    if (availableStock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const stockOut = new ProductOut({
      productCode: product.productCode,
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
}; 