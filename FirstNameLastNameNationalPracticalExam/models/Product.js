const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate total price before saving
productSchema.pre('save', function(next) {
  this.totalPrice = this.price * this.quantity;
  next();
});

// Calculate total price before updating
productSchema.pre('findOneAndUpdate', function() {
  const update = this.getUpdate();
  if (update.price && update.quantity) {
    update.totalPrice = update.price * update.quantity;
  }
});

module.exports = mongoose.model('Product', productSchema); 