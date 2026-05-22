const mongoose = require('mongoose');

const productInSchema = new mongoose.Schema({
  productCode: {
    type: String,
    ref: 'Product',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  uniquePrice: {
    type: Number,
    required: true,
    min: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  }
});

// Calculate total price before saving
productInSchema.pre('save', function(next) {
  this.totalPrice = this.quantity * this.uniquePrice;
  next();
});

module.exports = mongoose.model('ProductIn', productInSchema);