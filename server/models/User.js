const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClothingItem', // Reference to ClothingItem model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  orders: [
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to Order model
      },
    },
  ],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
