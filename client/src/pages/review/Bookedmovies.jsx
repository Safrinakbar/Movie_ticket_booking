import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import '../Ticket/bk.css';

const Booked = () => {
  const [tickets, setTickets] = useState([]); // State to store the list of tickets
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [reviews, setReviews] = useState([]); // State to store reviews

  // Fetch tickets from the backend API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tickets");
        setTickets(response.data); // Store the fetched tickets
        setLoading(false);
      } catch (error) {
        setError("Failed to load tickets.");
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Function to fetch reviews for a specific movie
  const fetchReviews = async (movieId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/review/${movieId}`);
      setReviews(response.data); // Set the reviews data
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // If data is loading, show a loading message
  if (loading) {
    return <div>Loading booked tickets...</div>;
  }

  // If there's an error fetching data, display the error message
  if (error) {
    return <div>{error}</div>;
  }

  // Function to handle adding a review with star rating
  const addReview = async (bookingId, movieId) => {
    try {
      // Display SweetAlert2 input for review text
      const { value: reviewText } = await Swal.fire({
        title: 'Add a Review',
        input: 'textarea',
        inputLabel: 'Write your review here:',
        inputPlaceholder: 'Enter your review...',
        showCancelButton: true,
        confirmButtonText: 'Submit Review',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!';
          }
        }
      });

      if (reviewText) {
        // Star rating system
        const rating = await getStarRating();

        if (rating !== null) {
          // Send the review and rating to the backend
          const response = await axios.post(`http://localhost:5000/api/review`, {
            movieId,
            bookingId,
            reviewText,
            rating
          });

          // Show success message with SweetAlert2
          Swal.fire({
            title: 'Review Added!',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'OK'
          });

          // Fetch reviews again to update the list
          fetchReviews(movieId);
        }
      }
    } catch (error) {
      // Show error message if the review submission fails
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add review.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  // Function to handle star rating selection
  const getStarRating = async () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Rate the Movie',
        html: `
          <div class="stars">
            <i class="star" data-value="1">&#9733;</i>
            <i class="star" data-value="2">&#9733;</i>
            <i class="star" data-value="3">&#9733;</i>
            <i class="star" data-value="4">&#9733;</i>
            <i class="star" data-value="5">&#9733;</i>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Submit Rating',
        cancelButtonText: 'Cancel',
        didOpen: () => {
          const stars = document.querySelectorAll('.star');
          stars.forEach(star => {
            star.addEventListener('mouseover', () => {
              const value = star.getAttribute('data-value');
              highlightStars(value);
            });
            star.addEventListener('mouseout', () => {
              const selected = document.querySelector('.star.selected');
              const value = selected ? selected.getAttribute('data-value') : 0;
              highlightStars(value);
            });
            star.addEventListener('click', () => {
              const value = star.getAttribute('data-value');
              selectStar(value);
              resolve(value);
            });
          });
        }
      });
    });
  };

  const highlightStars = (value) => {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
      if (parseInt(star.getAttribute('data-value')) <= parseInt(value)) {
        star.style.color = '#FFD700'; // Gold color for selected stars
      } else {
        star.style.color = '#ccc'; // Gray color for unselected stars
      }
    });
  };

  const selectStar = (value) => {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
      if (parseInt(star.getAttribute('data-value')) <= parseInt(value)) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
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
                <p><strong>Date:</strong> {ticket.date || "N/A"}</p>
              </div>
              <div className="ticket-action">
                {/* Add Review button */}
                <button onClick={() => addReview(ticket.bookingId, ticket.movieId._id)}>Add Review</button>
              </div>
              <div className="reviews">
                <h4>Reviews:</h4>
                {reviews.length === 0 ? (
                  <p>No reviews yet.</p>
                ) : (
                  <div className="reviews-list">
                    {reviews.map((review) => (
                      <div className="review" key={review._id}>
                        <p><strong>Rating:</strong> {review.rating}</p>
                        <p>{review.reviewText}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Booked;
