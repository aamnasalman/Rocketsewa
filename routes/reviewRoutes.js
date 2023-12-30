const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Create a new review
router.post('/create', reviewController.createReview);

// Fetch all reviews
router.get('/all', reviewController.getAllReviews);

module.exports = router;
