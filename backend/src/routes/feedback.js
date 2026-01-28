const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST /api/feedback - Submit feedback
router.post('/', async (req, res) => {
    try {
        const { rating, comment } = req.body;

        // Validation
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                error: 'Rating must be between 1 and 5'
            });
        }

        if (comment && comment.length > 500) {
            return res.status(400).json({
                success: false,
                error: 'Comment cannot exceed 500 characters'
            });
        }

        // Create feedback
        const feedback = new Feedback({
            rating,
            comment: comment || ''
        });

        await feedback.save();

        res.status(201).json({
            success: true,
            data: feedback,
            message: 'Feedback submitted successfully!'
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});

// GET /api/feedback - Get all feedback
router.get('/', async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: feedback.length,
            data: feedback
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});

module.exports = router;