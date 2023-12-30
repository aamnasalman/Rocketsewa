const Review = require('../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const {message, rating, userId } = req.body;

    const newReview = new Review({
      message,
      rating,
      userId
    });

    await newReview.save();

    res.status(201).json({ message: 'Review created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fetch all reviews
exports.getAllReviews = async (req, res) => {
  try {
    // Retrieve all reviews
    const reviews = await Review.find();

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
