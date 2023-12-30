const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'canceled', 'expired'],
    default: 'active',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  paymentMethod: {
    type: String, // Store payment method information (e.g., credit card, PayPal)
  },
  transactionId: {
    type: String, // Store the transaction ID for reference
  },
  // Add other subscription-related fields as needed
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
