const User = require('../models/User');
const ClothingItem = require('../models/ClothingItem');

// Add an item to the cart
exports.addToCart = async (req, res) => {
  const { userId, itemId, quantity } = req.body;

  try {
    const clothingItem = await ClothingItem.findById(itemId);
    if (!clothingItem) {
      return res.status(404).json({ error: 'Clothing item not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if item already exists in the cart
    const cartItem = user.cart.find((item) => item.itemId.toString() === itemId);
    if (cartItem) {
      // Update quantity if item exists
      cartItem.quantity += quantity;
    } else {
      // Add new item to the cart
      user.cart.push({ itemId, quantity });
    }

    await user.save();
    res.status(200).json({ message: 'Item added to cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart', details: error.message });
  }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
  const { userId } = req.body;
  const { itemId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.cart = user.cart.filter((item) => item.itemId.toString() !== itemId);

    await user.save();
    res.status(200).json({ message: 'Item removed from cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart', details: error.message });
  }
};

// View items in the cart
exports.viewCart = async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await User.findById(userId).populate('cart.itemId');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cart', details: error.message });
  }
};
