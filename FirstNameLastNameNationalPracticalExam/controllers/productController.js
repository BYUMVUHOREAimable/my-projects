const Product = require('../models/Product');
const ProductIn = require('../models/ProductIn');
const ProductOut = require('../models/ProductOut');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const totalPrice = price * quantity;

    const product = new Product({
      name,
      description,
      price,
      quantity,
      totalPrice
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const totalPrice = price * quantity;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        quantity,
        totalPrice
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete associated stock in/out records
    await ProductIn.deleteMany({ product: req.params.id });
    await ProductOut.deleteMany({ product: req.params.id });

    // Delete the product
    await Product.deleteOne({ _id: req.params.id });

    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add stock in
exports.addStockIn = async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;
    const totalPrice = price * quantity;

    // Create stock in record
    const stockIn = new ProductIn({
      product: productId,
      quantity,
      price,
      totalPrice
    });

    // Update product quantity
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.quantity += quantity;
    product.totalPrice = product.price * product.quantity;
    await product.save();

    const savedStockIn = await stockIn.save();
    res.status(201).json(savedStockIn);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add stock out
exports.addStockOut = async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;
    const totalPrice = price * quantity;

    // Check if product exists and has enough quantity
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Create stock out record
    const stockOut = new ProductOut({
      product: productId,
      quantity,
      price,
      totalPrice
    });

    // Update product quantity
    product.quantity -= quantity;
    product.totalPrice = product.price * product.quantity;
    await product.save();

    const savedStockOut = await stockOut.save();
    res.status(201).json(savedStockOut);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}; 