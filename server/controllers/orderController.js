const Order = require('../models/Order');
const User = require('../models/User');
const ClothingItem = require('../models/ClothingItem');

// Create a new order
exports.createOrder = async (req, res) => {
  const { userId, items } = req.body; // userId and items from the request body

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let totalAmount = 0;
    const orderItems = [];

    // Calculate total amount and verify items
    for (const item of items) {
      const clothingItem = await ClothingItem.findById(item.itemId);
      if (!clothingItem) {
        return res.status(404).json({ error: `Item with ID ${item.itemId} not found` });
      }
      totalAmount += clothingItem.newPrice * item.quantity;
      orderItems.push({
        itemId: clothingItem._id,
        quantity: item.quantity,
        price: clothingItem.newPrice,
      });
    }

    // Create a new order
    const order = new Order({
      userId,
      items: orderItems,
      totalAmount,
    });

    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
};

// View all orders for a user
exports.viewOrders = async (req, res) => {
  const { userId } = req.query; // Get userId from query params

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get all orders for the user
    const orders = await Order.find({ userId }).populate('items.itemId');
    res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve orders', details: error.message });
  }
};

// View a specific order by ID
exports.viewOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate('items.itemId');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve order', details: error.message });
  }
};

// Update the status of an order
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    if (!['pending', 'shipped', 'delivered', 'canceled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    order.updatedAt = Date.now();

    await order.save();
    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status', details: error.message });
  }
};
