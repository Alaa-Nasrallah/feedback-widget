﻿/**
 * FeedbackForm Component
 * Allows users to submit feedback with a rating and optional comment.
 */

import React, { useState } from "react";
import StarRating from "./StarRating";

function FeedbackForm() {
  // State for form inputs and UI feedback
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle rating selection and clear any existing error
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that a rating is selected
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    // Clear previous messages and set loading state
    setError("");
    setLoading(true);
    setMessage("");

    try {
      // Get API base URL from environment or default to localhost
      const API_BASE_URL = "http://local";
    
      // Send POST request to submit feedback
      const response = await fetch(`${API_BASE_URL}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating, comment }),
      });

      if (response.ok) {
        // Success: show message and reset form
        setMessage("Thank you for your feedback!");
        setRating(0);
        setComment("");
        setError("");
      } else {
        // Handle API error response
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || errorData.message}`);
      }
    } catch (err) {
      // Handle network or other errors
      setMessage("Server error. Please try again later.");
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      {/* Rating Section */}
      <div className="rating-section">
        <label className="rating-label">Rate your experience:</label>
        <StarRating rating={rating} setRating={handleRatingChange} />
      </div>

      {/* Comment Section */}
      <div className="comment-section">
        <textarea
          className="comment-textarea"
          placeholder="Optional comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
        />
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Submit Button */}
      <button type="submit" disabled={loading} className="submit-button">
        {loading ? "Submitting..." : "Submit"}
      </button>

      {/* Success/Error Message */}
      {message && <p className={message.includes("Error") ? "error-message" : "success-message"}>{message}</p>}
    </form>
  );
}

export default FeedbackForm;
