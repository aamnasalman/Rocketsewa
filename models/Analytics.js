const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const analyticsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  pageViews: {
    type: Number, // Store the number of page views for the date
  },
  userActivity: {
    type: Schema.Types.Mixed, // Store user activity data as a flexible object
  },
  // Add other analytics-related fields as needed
});

module.exports = mongoose.model('Analytics', analyticsSchema);
