const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
console.log('Connecting to MongoDB Atlas...');

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/feedback', feedbackRoutes);

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Feedback API is running' });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});