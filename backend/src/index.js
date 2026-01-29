/**
 * Main Server File
 * Sets up Express server, database connection, middleware, and routes.
 */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB Atlas
console.log('Connecting to MongoDB Atlas...');
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    });

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// API Routes
app.use('/api/feedback', feedbackRoutes);

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'Feedback API is running' });
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
