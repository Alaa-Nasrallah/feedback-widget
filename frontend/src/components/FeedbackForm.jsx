﻿import React, { useState } from "react";
import StarRating from "./StarRating";

function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    setError("");
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3001/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating, comment }),
      });

      if (response.ok) {
        setMessage("Thank you for your feedback!");
        setRating(0);
        setComment("");
        setError("");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (err) {
      setMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <div className="rating-section">
        <label className="rating-label">Rate your experience:</label>
        <StarRating rating={rating} setRating={handleRatingChange} />
      </div>
      <div className="comment-section">
        <textarea
          className="comment-textarea"
          placeholder="Optional comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" disabled={loading} className="submit-button">
        {loading ? "Submitting..." : "Submit"}
      </button>
      {message && <p className="success-message">{message}</p>}
    </form>
  );
}

export default FeedbackForm;