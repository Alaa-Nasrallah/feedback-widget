const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import and use feedback routes
const feedbackRoutes = require('./routes/feedback');
app.use('/api/feedback', feedbackRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Feedback API is running!',
    endpoints: {
      submitFeedback: 'POST /api/feedback',
      getFeedback: 'GET /api/feedback'
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});