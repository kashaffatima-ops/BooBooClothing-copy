const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getAllClothingItems,
  getClothingItemById,
  createClothingItem,
  updateClothingItem,
  deleteClothingItem,
} = require('../controllers/clothingController');

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route to get all clothing items
router.get('/', getAllClothingItems);

// Route to get a specific clothing item by ID
router.get('/:id', getClothingItemById);

// Route to create a new clothing item with image upload
router.post('/', upload.single('image'), createClothingItem);

// Route to update a clothing item by ID
router.put('/:id', upload.single('image'), updateClothingItem);

// Route to delete a clothing item by ID
router.delete('/:id', deleteClothingItem);

module.exports = router;
