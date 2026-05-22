const mongoose = require('mongoose');

const productOutSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Calculate total price before saving
productOutSchema.pre('save', function(next) {
  this.totalPrice = this.price * this.quantity;
  next();
});

module.exports = mongoose.model('ProductOut', productOutSchema); 