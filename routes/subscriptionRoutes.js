const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/SubscriptionController');

// Create a new subscription
router.post('/', subscriptionController.createSubscription);

// Renew a subscription
router.put('/renew/:subscriptionId', subscriptionController.renewSubscription);

// Cancel a subscription
router.put('/cancel/:subscriptionId', subscriptionController.cancelSubscription);

// Add more subscription-related routes as needed

module.exports = router;
