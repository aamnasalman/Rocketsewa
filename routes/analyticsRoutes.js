const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Record user analytics data
router.post('/', analyticsController.recordAnalytics);

// Retrieve analytics data by user and date
router.get('/:userId/:date', analyticsController.getAnalyticsByUserAndDate);

// Add more analytics-related routes as needed

module.exports = router;
