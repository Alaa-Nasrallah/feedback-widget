/**
 * Feedback Model
 * Defines the schema for feedback documents in MongoDB.
 */

const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        maxlength: 500,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the Feedback model
module.exports = mongoose.model('Feedback', feedbackSchema);
