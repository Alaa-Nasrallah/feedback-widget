const express = require('express');
const router = express.Router();

// Temporary in-memory storage
let feedbacks = [];
let id = 1;

// POST /api/feedback
router.post('/', (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    // Validation
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    if (comment && comment.length > 500) {
      return res.status(400).json({ error: 'Comment cannot exceed 500 characters' });
    }
    
    const feedback = {
      id: id++,
      rating,
      comment: comment || '',
      createdAt: new Date()
    };
    
    feedbacks.push(feedback);
    
    res.status(201).json({ 
      message: 'Feedback submitted successfully',
      feedback 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/feedback
router.get('/', (req, res) => {
  try {
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;