const Staff = require('../models/Staff');

const createStaff = async (req, res) => {
  const { name, position, email, phone } = req.body;

  try {
    const newStaff = new Staff({ name, position, email, phone });
    await newStaff.save();
    res.status(201).json({ success: true, data: newStaff });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAllStaff = async (req, res) => {
  try {
    const staffMembers = await Staff.find();
    res.status(200).json({ success: true, data: staffMembers });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateStaff = async (req, res) => {
  const { name, position, email, phone } = req.body;

  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      { name, position, email, phone },
      { new: true }
    );
    if (!staff) {
      return res.status(404).json({ success: false, error: 'Staff member not found' });
    }
    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
      return res.status(404).json({ success: false, error: 'Staff member not found' });
    }
    res.status(200).json({ success: true, data: 'Staff member deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  createStaff,
  getAllStaff,
  updateStaff,
  deleteStaff,
};
