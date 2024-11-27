import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Ticket/tick.css";
import Barcode from "react-barcode";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import { toPng } from "html-to-image"; // Import html-to-image

const Genticket = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movieImage, setMovieImage] = useState("");
  const ticketRef = useRef();

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tickets/${ticketId}`);
        const fetchedTicket = response.data.ticket;

        if (fetchedTicket?.movieId?.image) {
          setMovieImage(fetchedTicket.movieId.image);
        } else {
          console.error("Movie image not found");
        }

        setTicket(fetchedTicket);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    if (ticketId) {
      fetchTicketDetails();
    }
  }, [ticketId]);

  const downloadTicket = () => {
    if (!ticketRef.current) return;

    // Use toPng to capture the ticket as a PNG image
    toPng(ticketRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${ticket.bookingId}_ticket.png`;
        link.href = dataUrl;
        link.click();

        Swal.fire("Downloaded!", "Your ticket has been downloaded as a PNG.", "success");
      })
      .catch((error) => {
        console.error("Error generating PNG:", error);
        Swal.fire("Error", "Could not download the ticket.", "error");
      });
  };

  const emailTicket = () => {
    Swal.fire({
      title: "Enter Email ID",
      input: "email",
      inputPlaceholder: "example@gmail.com",
      showCancelButton: true,
      confirmButtonText: "Send Ticket",
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const email = result.value;

        // Send ticket details as plain text email
        const ticketDetails = `
          Movie Name: ${ticket.movieId?.title || "N/A"}
          Booking ID: ${ticket.bookingId}
          Time: ${ticket.time || "N/A"}
          Date: ${ticket.date || "N/A"}
        `;

        // Send email with EmailJS
        emailjs
          .send(
            "service_ezkixz9", // service ID
            "template_0fckftk", // template ID
            {
              to_email: email,
              message: ticketDetails, // Sending ticket details as text
            },
            "J4sxeXXzhnztzN9OV" // public key
          )
          .then(() => {
            Swal.fire("Sent!", "Your ticket details have been emailed successfully.", "success");
          })
          .catch((error) => {
            console.error("Error sending email:", error);
            Swal.fire("Error", "Could not send the email.", "error");
          });
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ticket-container">
      <div className="ticket-actions">
        <button onClick={downloadTicket} className="btn-download">Download Ticket</button>
        <button onClick={emailTicket} className="btn-email">Email Ticket</button>
      </div>

      <div className="ticket" ref={ticketRef}>
        {/* Movie Image */}
        {movieImage && (
          <div className="ticket-image">
            <img src={movieImage} alt="Movie Poster" />
          </div>
        )}

        {/* Ticket Details */}
        <div className="ticket-details">
          <div className="ticket-introduction">
            <h1>BookMyMovie</h1>
            Arrive 5 minutes earlier and enjoy your day!
          </div>

          <div className="ticket-info">
            <p><strong>Movie Title:</strong> {ticket.movieId?.title || "N/A"}</p>
            <p><strong>Booking ID:</strong> {ticket.bookingId}</p>
            <p><strong>Seats:</strong> {ticket.seatNumbers?.join(", ") || "N/A"}</p>
            <p><strong>Time:</strong> {ticket.time || "N/A"}</p>
            <p><strong>Date:</strong> {ticket.date || "N/A"}</p>
          </div>

          <div className="barcode">
            <Barcode value={ticket.bookingId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Genticket;
