const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quickContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  // You can add additional fields if needed
});

module.exports = mongoose.model('QuickContact', quickContactSchema);
