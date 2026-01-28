const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const feedbackRoutes = require('./routes/feedback'); // Import routes

const app = express();
const PORT = process.env.PORT || 3001;

// ========== DATABASE CONNECTION ==========
console.log('🔗 Connecting to MongoDB Atlas...');

mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas!');
    console.log(`📁 Database: feedback_widget`);
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  });
// ========== END DATABASE CONNECTION ==========

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/feedback', feedbackRoutes); // Use feedback routes

// Simple route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Feedback Widget API',
    status: 'running',
    database: 'connected'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  res.json({
    status: 'OK',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});