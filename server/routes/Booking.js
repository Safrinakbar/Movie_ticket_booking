const express = require('express');
const authenticateUser = require('../routes/authmiddleware.js'); // Import the middleware
const Booking = require('../model/Booking.js');
const Movie = require('../model/Movie.js');
const Ticket = require('../model/Ticket.js'); // Import the Ticket model
const router = express.Router();
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
  const { movieTitle, tickets, time, date, seatNumbers } = req.body;

  try {
    // Check if the movie exists
    const movie = await Movie.findOne({ title: movieTitle });
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Create a new booking
    const booking = new Booking({
      movieTitle,
      tickets,
      time,
      date,
      seatNumbers,
      movieId: movie._id, // Store movieId in the booking
    });

    await booking.save();

    // Create a new ticket entry
    const ticket = new Ticket({
      bookingId: booking._id,  // Link ticket with booking
      movieId: movie._id,      // Link to the movie using movieId
      tickets,
      time,
      date,
      seatNumbers,
    });

    await ticket.save();

    // Respond with the ticketId after saving the ticket
    res.status(201).json({
      message: 'Booking successful, ticket generated!',
      ticketId: ticket._id,  // Send the ticketId back to the frontend
    });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch ticket details by ticketId
router.get('/:ticketId', async (req, res) => {
  const { ticketId } = req.params;

  try {
    // Fetch the ticket and populate the movieId field with the 'image' and 'title'
    const ticket = await Ticket.findById(ticketId)
      .populate('movieId', 'image title'); // Populate only image and title fields of movieId

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json({ ticket }); // Send the populated ticket data
  } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
