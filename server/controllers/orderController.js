const Order = require('../models/Order');
const User = require('../models/User');
const ClothingItem = require('../models/ClothingItem');
const Product = require('../models/ClothingItem');

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
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    console.log(order);
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve order', details: error.message });
  }
};

// exports.viewAllOrders = async (req, res) => {
//   try {
//     const allorders = await Order.find();
//     console.log("Fetched Orders:", allorders); // Debugging log
//     res.status(200).json({ allorders });
//   } catch (error) {
//     console.error("Error fetching orders:", error.message); // Log the error
//     console.error("Stack Trace:", error.stack); // Log the stack trace
//     res.status(500).json({ error: 'Failed to retrieve orders', details: error.message });
//   }
// };


// Update the status of an order
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

console.log(orderId);
console.log(status);

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

// View all current orders
exports.viewAllOrders = async (req, res) => {
  try {
    const allorders = await Order.find();
    console.log("Fetched Orders:", allorders); // Debugging log
    res.status(200).json({ allorders });
  } catch (error) {
    console.error("Error fetching orders:", error.message); // Log the error
    console.error("Stack Trace:", error.stack); // Log the stack trace
    res.status(500).json({ error: 'Failed to retrieve orders', details: error.message });
  }
};

// Fetch complete customer data by ID
exports.getCustomer = async (req, res) => {
  const userId = req.params.userId; // Extract userId as a string
  try {
    const user = await User.findById(userId); // Fetch user, exclude password
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ error: 'Failed to retrieve user data', details: error.message });
  }
};

//fetching all products for order
// exports.getProductsByIds = async (req, res) => {
//   const { ids } = req.body; // Extract product IDs from request body

//   try {
//     if (!ids || ids.length === 0) {
//       return res.status(400).json({ error: 'No product IDs provided' });
//     }

//     // Fetch products matching the provided IDs
//     const products = await ClothingItem.find({ _id: { $in: ids } });

//     if (products.length === 0) {
//       return res.status(404).json({ error: 'No products found for the provided IDs' });
//     }

//     res.status(200).json({ products });
//   } catch (error) {
//     console.error('Error fetching products:', error.message);
//     res.status(500).json({ error: 'Failed to retrieve products', details: error.message });
//   }
// };
exports.getProductsByIds = async (req, res) => {
  const { ids } = req.body; // Ensure the request body contains `ids`

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'Invalid or missing IDs in request body' });
  }

  try {
    const products = await Product.find({ _id: { $in: ids } }); // Fetch products with matching IDs
    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found for the given IDs' });
    }
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
};

