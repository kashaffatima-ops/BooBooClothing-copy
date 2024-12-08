const express = require('express');
const staffController = require('../controllers/staffController'); 
const router = express.Router();

router.post('/', staffController.createStaff);

router.get('/', staffController.getAllStaff);

router.put('/:id', staffController.updateStaff);

router.delete('/:id', staffController.deleteStaff);

module.exports = router;