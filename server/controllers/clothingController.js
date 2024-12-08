const ClothingItem = require('../models/ClothingItem');
const fs = require('fs');

// Get all clothing items
const getAllClothingItems = async (req, res) => {
  try {
    const clothingItems = await ClothingItem.find();
    res.status(200).json({ success: true, data: clothingItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get a clothing item by ID
 const getClothingItemById = async (req, res) => {

 try {
   const clothingItem = await ClothingItem.findById(req.params.id);

   if (!clothingItem) {      return res.status(404).json({ success: false, message: 'Clothing item not found' });    }

    res.status(200).json({ success: true, data: clothingItem });
   } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
 };

const getClothingItemByIdks = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid clothing item ID' });
    }

    const clothingItem = await ClothingItem.findById(req.params.id);

    if (!clothingItem) {
      return res.status(404).json({ success: false, message: 'Clothing item not found' });
    }

    res.status(200).json({ success: true, data: clothingItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new clothing item
const createClothingItem = async (req, res) => {
  try {
    const { sizes,Name, category, newPrice, oldPrice, description } = req.body;

    // Validate file upload
    const imagePath = req.file ? req.file.path : null;

    if (!imagePath) {
      return res.status(400).json({ success: false, message: 'Image upload is required' });
    }

    // Parse sizes if sent as a JSON string
    const parsedSizes = JSON.parse(sizes);

    const clothingItem = new ClothingItem({
      imageName: imagePath,
      sizes: parsedSizes,
      Name,
      category,
      newPrice,
      oldPrice,
      description,
    });

    await clothingItem.save();
    res.status(201).json({ success: true, data: clothingItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a clothing item by ID
const updateClothingItem = async (req, res) => {
  try {
    const { sizes, category, newPrice, oldPrice, description } = req.body;

    const clothingItem = await ClothingItem.findById(req.params.id);

    if (!clothingItem) {
      return res.status(404).json({ success: false, message: 'Clothing item not found' });
    }

    // Check for a new image upload
    if (req.file) {
      // Delete the old image file if it exists
      if (clothingItem.imageName) {
        fs.unlink(clothingItem.imageName, (err) => {
          if (err) console.error('Error deleting old image:', err);
        });
      }

      clothingItem.imageName = req.file.path;
    }

    clothingItem.sizes = sizes ? JSON.parse(sizes) : clothingItem.sizes;
    clothingItem.category = category || clothingItem.category;
    clothingItem.newPrice = newPrice || clothingItem.newPrice;
    clothingItem.oldPrice = oldPrice || clothingItem.oldPrice;
    clothingItem.description = description || clothingItem.description;

    await clothingItem.save();
    res.status(200).json({ success: true, data: clothingItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a clothing item by ID
const deleteClothingItem = async (req, res) => {
  try {
    const clothingItem = await ClothingItem.findById(req.params.id);

    if (!clothingItem) {
      return res.status(404).json({ success: false, message: 'Clothing item not found' });
    }

    // Delete the associated image file
    if (clothingItem.imageName) {
      fs.unlink(clothingItem.imageName, (err) => {
        if (err) console.error('Error deleting image:', err);
      });
    }

    await clothingItem.remove();
    res.status(200).json({ success: true, message: 'Clothing item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllClothingItems,
  getClothingItemById,
  createClothingItem,
  updateClothingItem,
  deleteClothingItem,
};
