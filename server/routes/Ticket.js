const express = require('express');
const Ticket = require('../model/Ticket');

const router = express.Router();

router.post('/', async (req, res) => {
  const { movieTitle, tickets, seatNumbers, time, date, movieId } = req.body;

  try {
   
    const newTicket = new Ticket({
      movieTitle,
      tickets,
      seatNumbers,
      time,
      date,
      movieId,  
    });

    // Save the new ticket
    const ticket = await newTicket.save();
    console.log('Ticket created:', ticket);

    // Populate the movieId to get the movie details including the image
    const populatedTicket = await Ticket.findById(ticket._id)
      .populate('movieId', 'image');  

    // Return the populated ticket
    res.status(201).json({ ticket: populatedTicket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:ticketId', async (req, res) => {
    const { ticketId } = req.params;
  
    try {
      const ticket = await Ticket.findById(ticketId)
        .populate('movieId', 'image title'); // Populate movieId with the 'image' and 'title'
        console.log(ticket)
  
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
  
      // Return the ticket with the populated movieId data
      res.status(200).json({ ticket });
    } catch (error) {
      console.error("Error fetching ticket:", error);
      res.status(500).json({ error: 'Server error' });
    }
  });


  router.get('/', async (req, res) => {
    try {
      // Fetch all tickets and populate the movieId field
      const tickets = await Ticket.find().populate('movieId', 'title');  // Populate movieId with the 'title' field
      res.json(tickets);  // Send the tickets as the response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch tickets" });
    }
  });

  router.delete('/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
  
    try {
      // Find the ticket by bookingId and delete it
      const ticket = await Ticket.findOneAndDelete({ bookingId });
  
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
  
      // Send a success response
      res.status(200).json({ message: "Ticket canceled successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to cancel ticket" });
    }
  });
  
 
  
  
  
  
module.exports = router;
