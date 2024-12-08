const mongoose = require('mongoose');

const saleEventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const SaleEvent = mongoose.model('SaleEvent', saleEventSchema);

module.exports = SaleEvent;
