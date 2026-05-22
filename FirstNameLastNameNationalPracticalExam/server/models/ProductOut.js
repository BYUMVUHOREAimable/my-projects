const mongoose = require('mongoose');

const productOutSchema = new mongoose.Schema({
  productCode: {
    type: String,
    required: [true, 'Please provide a product code'],
    ref: 'Product'
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date'],
    default: Date.now
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide quantity'],
    min: [1, 'Quantity must be at least 1']
  },
  uniquePrice: {
    type: Number,
    required: [true, 'Please provide unique price'],
    min: [0, 'Price must be at least 0']
  },
  totalPrice: {
    type: Number,
    required: [true, 'Please provide total price'],
    min: [0, 'Total price must be at least 0']
  }
}, {
  timestamps: true
});

// Calculate total price before saving
productOutSchema.pre('save', function(next) {
  this.totalPrice = this.quantity * this.uniquePrice;
  next();
});

module.exports = mongoose.model('ProductOut', productOutSchema);