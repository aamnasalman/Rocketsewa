const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  categories: {
    type: [String], // Store content categories as an array of strings
  },
  publicationDate: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String], // Store content tags as an array of strings
  },
  // Add other content-related fields as needed
});

module.exports = mongoose.model('Content', contentSchema);
