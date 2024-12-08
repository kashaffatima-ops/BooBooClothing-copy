const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'ClothingItem', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, // Price at the time of order
    },
  ],
  totalAmount: { type: Number, required: true }, // Calculated total of the order
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'canceled'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order=mongoose.model('Order', orderSchema);
module.exports = Order;
