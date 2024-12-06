const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: true,
  },

  Name:{
    type: String,
    required: true,
  },
 
  sizes: {
    type: Map,
    of: Number, // stores the quantity for each size
    required: true,
  },
  category: {
    type: String,
    enum: ['shirts', 'trousers', 'hoodies'],
    required: true,
  },
  newPrice: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const ClothingItem = mongoose.model('ClothingItem', clothingItemSchema);
module.exports = ClothingItem;
