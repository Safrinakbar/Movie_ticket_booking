const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',  
    required: true,
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking', 
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,  
  },
  reviewText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,  
  },
});

module.exports = mongoose.model('Review', reviewSchema);
