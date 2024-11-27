import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import './bk.css';

const BookedTickets = () => {
  const [tickets, setTickets] = useState([]); // State to store the list of tickets
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch tickets from the backend API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tickets"); // Correct API endpoint
        setTickets(response.data); // Store the fetched tickets
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        setError("Failed to load tickets.");
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchTickets(); // Call the function to fetch tickets
  }, []);  // Empty dependency array ensures this runs only once, when the component mounts

  // If data is loading, show a loading message
  if (loading) {
    return <div>Loading booked tickets...</div>;
  }

  // If there's an error fetching data, display the error message
  if (error) {
    return <div>{error}</div>;
  }

  // Function to handle canceling a ticket
  const cancelTicket = async (bookingId) => {
    try {
      // Display SweetAlert2 confirmation dialog
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to cancel this ticket?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, keep it',
      });

      if (result.isConfirmed) {
        const response = await axios.delete(`http://localhost:5000/api/tickets/${bookingId}`);
        
        // Show success message with SweetAlert2
        Swal.fire({
          title: 'Canceled!',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'OK'
        });

        // Remove the canceled ticket from the UI state
        setTickets(tickets.filter(ticket => ticket.bookingId !== bookingId)); 
      } else {
        // If user cancels the operation, show a message
        Swal.fire({
          title: 'Cancelled',
          text: 'Your ticket is safe!',
          icon: 'info',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      // Show error message if the cancellation fails
      Swal.fire({
        title: 'Error!',
        text: 'Failed to cancel ticket.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  // Render the list of tickets in card format
  return (
    <div className="booked-tickets-container">
      <h2>Your Booked Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets found.</p> // Show this if no tickets are available
      ) : (
        <div className="tickets-card-container">
          {tickets.map((ticket) => (
            <div className="ticket-card" key={ticket.bookingId}>
              <div className="ticket-info">
                <h3>Booking ID: {ticket.bookingId}</h3>
                <p><strong>Movie Title:</strong> {ticket.movieId?.title || "N/A"}</p>
                <p><strong>Seats:</strong> {ticket.seatNumbers?.join(", ") || "N/A"}</p>
                <p><strong>Time:</strong> {ticket.time || "N/A"}</p>
                <p><strong>Date:</strong> {ticket.date+'Dec, 24' || "N/A"}</p>
              </div>
              <div className="ticket-action">
                <button onClick={() => cancelTicket(ticket.bookingId)}>Cancel</button> {/* Cancel button */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedTickets;
