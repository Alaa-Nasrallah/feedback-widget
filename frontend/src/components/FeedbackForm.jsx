import React, { useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setMessage({ type: 'error', text: 'Please select a rating' });
      return;
    }
    
    setLoading(true);
    try {
      await axios.post('http://localhost:3001/api/feedback', {
        rating,
        comment
      });
      
      setMessage({ type: 'success', text: 'Thank you for your feedback!' });
      setRating(0);
      setComment('');
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to submit feedback. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-form">
      <h2>How was your experience?</h2>
      
      <StarRating rating={rating} onRate={setRating} />
      
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
        Selected: <strong>{rating}</strong> star{rating !== 1 ? 's' : ''}
      </p>
      
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Optional comment (max 500 characters)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
          rows={4}
        />
        
        <div className="char-count">
          {comment.length}/500 characters
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'SUBMIT FEEDBACK'}
        </button>
      </form>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;