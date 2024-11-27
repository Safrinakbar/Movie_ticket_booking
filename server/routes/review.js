const express = require('express');
const Review = require('../model/Review');
const router = express.Router();

// Route to add a new review
router.post('/', async (req, res) => {
  const { movieId, bookingId, rating, reviewText } = req.body;
  
  try {
    // Create a new review object
    const newReview = new Review({
      movie: movieId,
      booking: bookingId,
      rating,
      reviewText,
    });

    // Save the review to the database
    const savedReview = await newReview.save();
    console.log('Saved Review:', savedReview); 
    res.status(201).json({ message: 'Review added successfully!', review: savedReview });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting review', error });
  }
});


router.get('/:movieId', async (req, res) => {
  try {
    // Fetch reviews for the movie from the database
    const reviews = await Review.find({ movie: req.params.movieId })
      .populate('movie booking')  
      .exec();

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
});

module.exports = router;
