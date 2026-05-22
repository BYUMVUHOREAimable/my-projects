const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productCode: {
    type: String,
    required: [true, 'Please provide a product code'],
    unique: true,
    trim: true
  },
  productName: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 