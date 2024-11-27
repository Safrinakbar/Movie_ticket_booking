import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../Ticket/book.css';

const TicketBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [date, setDate] = useState("11");
  const [time, setTime] = useState("11:00");
  const [movieTitle, setMovieTitle] = useState("");  // Track movie title
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { title } = useParams();  // Fetch title from route parameters (using 'title' instead of 'movieId')
  console.log("Movie title from route:", title);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!title) {
        console.error("No movie title provided");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${title}`);  // Fetch by movie title
        console.log("Fetched movie data:", response.data);
        setMovieTitle(response.data.title); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error.response?.data || error.message);
        setLoading(false);
      }
    };

    if (title) {
      fetchMovieDetails(); // Fetch movie details only when title is available
    }
  }, [title]);

  const toggleSeatSelection = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const handleBooking = async () => {
    if (!movieTitle || selectedSeats.length === 0) {
      Swal.fire("Error", "Movie details or seats are missing!", "error");
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire("Error", "Please log in to book tickets.", "error");
      navigate('/login');
      return;
    }
  
    const bookingData = {
      movieTitle,  // Movie title
      tickets: selectedSeats.length,
      time,
      date,
      seatNumbers: selectedSeats,
    };
  
    console.log("Booking data being sent:", bookingData);  // Debugging log
  
    try {
      const response = await axios.post('http://localhost:5000/api/bookings', bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Booking response:", response.data); // Log the response
  
      // Check if ticketId is present in the response
      const ticketId = response.data.ticketId;
      if (ticketId) {
        Swal.fire("Success", "Booking confirmed!", "success").then(() => {
          navigate(`/ticket/${ticketId}`);  // Navigate to ticket page using ticketId
        });
      } else {
        Swal.fire("Error", "Ticket generation failed.", "error");
      }
  
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);  // Log the error
      Swal.fire("Error", error.response?.data.error || "Booking failed!", "error");
    }
  };
  
  

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while movie data is being fetched
  }

  return (
    <div style={{ width: "100%", height: "100vh", margin: 0, padding: 0, fontFamily: "'Poppins', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(to right, #a2d8a2, #66c266)" }}>
      <div className="center">
        <div className="tickets">
          <div className="ticket-selector">
            <div className="head">
              <div className="title">
                {movieTitle || 'Movie Title'}  {/* Use movieTitle */}
              </div>
            </div>
            <div className="seats">
              <div className="status">
                <div className="item">Available</div>
                <div className="item">Booked</div>
                <div className="item">Selected</div>
              </div>
              <div className="all-seats">
                {[...Array(60).keys()].map((i) => (
                  <label key={i}>
                    <input
                      type="checkbox"
                      checked={selectedSeats.includes(i)}
                      onChange={() => toggleSeatSelection(i)}
                    />
                    <span className={`seat ${selectedSeats.includes(i) ? 'selected' : ''}`} />
                  </label>
                ))}
              </div>
            </div>
            <div className="timings">
              <div className="dates">
                {[11, 12, 13, 14, 15, 16, 17].map((day) => (
                  <label key={day} className="dates-item">
                    <input
                      type="radio"
                      checked={date === `${day}`}
                      onChange={() => setDate(`${day}`)}
                    />
                    <div className="day">{new Date(2024, 10, day).toLocaleString('en', { weekday: 'short' })}</div>
                    <div className="date">{day}</div>
                  </label>
                ))}
              </div>
              <div className="times">
                {["11:00", "02:30", "06:00", "09:30"].map((showTime) => (
                  <label key={showTime} className="time">
                    <input
                      type="radio"
                      checked={time === showTime}
                      onChange={() => setTime(showTime)}
                    />
                    {showTime}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="price">
            <div className="total">
              <span> {selectedSeats.length} Tickets </span>
              <div className="amount">{selectedSeats.length * 200}</div>
            </div>
            <button type="button" onClick={handleBooking}>
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketBooking;
