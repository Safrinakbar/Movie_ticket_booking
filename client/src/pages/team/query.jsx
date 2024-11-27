import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // For notifications

const SendQuery = () => {
  const [query, setQuery] = useState(""); // State to store the user's query
  const [email, setEmail] = useState(""); // State to store the user's email

  // Inline CSS styles
  const styles = {
    body: {
      margin: 0,
      padding: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f7fa", // Light background color for contrast
      fontFamily: "'Roboto', sans-serif", // Smooth, modern font
    },
    container: {
      alignItems: "center",
      width: "60%", // Adjusted width for a balanced form
      maxWidth: "600px", // Make the form a little wider
      padding: "30px",
      borderRadius: "20px", // Rounded corners
      backgroundColor: "#ffffff",
      boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
      fontFamily: "'Arial', sans-serif",
    },
    heading: {
      textAlign: "center",
      color: "#333",
      fontSize: "28px",
      fontWeight: 600,
      marginBottom: "20px",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      fontWeight: 600,
      marginBottom: "10px",
      color: "#555",
      fontSize: "16px",
    },
    input: {
      width: "100%",
      padding: "15px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "10px", // Rounded input fields
      boxSizing: "border-box",
      backgroundColor: "#f9f9f9",
      transition: "border-color 0.3s, background-color 0.3s",
    },
    inputFocus: {
      outline: "none",
      borderColor: "#007BFF",
      backgroundColor: "#e6f7ff", // Light blue background on focus
    },
    textarea: {
      width: "100%",
      padding: "15px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "10px", // Rounded textarea
      backgroundColor: "#f9f9f9",
      resize: "vertical",
      minHeight: "150px", // Ensure textarea is sufficiently tall
      transition: "border-color 0.3s, background-color 0.3s",
    },
    textareaFocus: {
      outline: "none",
      borderColor: "#007BFF",
      backgroundColor: "#e6f7ff", // Light blue background on focus
    },
    button: {
      width: "100%",
      padding: "15px",
      fontSize: "18px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#218838",
    },
    buttonActive: {
      backgroundColor: "#1e7e34",
    },
  };

  // Function to handle sending the query to the backend
  const sendQuery = async () => {
    if (!email || !query) {
      Swal.fire({
        title: "Error!",
        text: "Please fill out both the email and query fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      // Send the query and email via a POST request
      const response = await axios.post("http://localhost:5000/api/query", {
        query,
        email,
      });

      // If the request is successful, show the success message
      Swal.fire({
        title: "Thank you!",
        text: "We have received your query and will look into it shortly.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Clear the input fields after successful submission
      setEmail(""); // Reset email state
      setQuery(""); // Reset query state
    } catch (error) {
      // If an error occurs, show an error message
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "An error occurred while sending the query.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Send Your Query</h2>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="query" style={styles.label}>
            Your Query:
          </label>
          <textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query here"
            rows="4"
            required
            style={styles.textarea}
          ></textarea>
        </div>
        <button
          onClick={sendQuery}
          style={{
            ...styles.button,
            ":hover": styles.buttonHover,
            ":active": styles.buttonActive,
          }}
        >
          Submit Query
        </button>
      </div>
    </div>
  );
};

export default SendQuery;
