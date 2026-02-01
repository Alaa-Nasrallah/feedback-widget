/**
 * Feedback Routes
 * Handles API endpoints for submitting and retrieving feedback.
 */

const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

/**
 * POST /api/feedback - Submit new feedback
 * Validates rating (1-5) and comment length, then saves to database.
 */
router.post('/', async (req, res) => {
    try {
        const { rating, comment } = req.body;

        // Validate rating: must be between 1 and 5
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                error: 'Rating must be between 1 and 5'
            });
        }

        // Validate comment length: max 500 characters
        if (comment && comment.length > 500) {
            return res.status(400).json({
                success: false,
                error: 'Comment cannot exceed 500 characters'
            });
        }

        // Create and save new feedback document
        const feedback = new Feedback({
            rating,
            comment: comment || '' // Default to empty string if no comment
        });

        await feedback.save();

        // Return success response with created feedback
        res.status(201).json({
            success: true,
            data: feedback,
            message: 'Feedback submitted successfully!'
        });

    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});

/**
 * GET /api/feedback - Retrieve all feedback
 * Returns sorted list of all feedback entries (newest first).
 */
router.get('/', async (req, res) => {
    try {
        // Fetch all feedback, sorted by creation date (descending)
        const feedback = await Feedback.find().sort({ createdAt: -1 });

        // Return feedback data with count
        res.status(200).json({
            success: true,
            count: feedback.length,
            data: feedback
        });
    } catch (error) {
        console.error('Error retrieving feedback:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});

module.exports = router;
