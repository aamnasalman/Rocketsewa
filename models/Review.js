const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    // type: Schema.Types.ObjectId,
    // ref: 'User', // Reference the 'User' model
    type: String,
    required: true,
  },
  // You can add additional fields if needed
});

module.exports = mongoose.model('Review', reviewSchema);
