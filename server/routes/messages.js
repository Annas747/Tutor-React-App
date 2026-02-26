const express = require('express');
const router = express.Router();
const db = require('../db');

// Input sanitization helper
const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;

    // Remove HTML tags and dangerous characters
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .trim()
        .substring(0, 1000); // Limit length to prevent abuse
};

// Get recent messages
router.get('/', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT m.id, m.content, m.created_at, u.name, u.role, u.id as sender_id
            FROM community_messages m
            JOIN users u ON m.sender_id = u.id
            ORDER BY m.created_at ASC
            LIMIT 100
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Post a message
router.post('/', async (req, res) => {
    const { sender_id, content } = req.body;

    // Validate input
    if (!content || typeof content !== 'string') {
        return res.status(400).json({ error: 'Content is required and must be a string' });
    }

    if (!sender_id) {
        return res.status(400).json({ error: 'Sender ID is required' });
    }

    // Sanitize content
    const sanitizedContent = sanitizeInput(content);

    if (sanitizedContent.length === 0) {
        return res.status(400).json({ error: 'Message cannot be empty' });
    }

    if (sanitizedContent.length > 1000) {
        return res.status(400).json({ error: 'Message too long (max 1000 characters)' });
    }

    try {
        const result = await db.query(
            'INSERT INTO community_messages (sender_id, content) VALUES ($1, $2) RETURNING *',
            [sender_id, sanitizedContent]
        );

        // Fetch the user details to return a complete message object
        const user = await db.query('SELECT name, role FROM users WHERE id = $1', [sender_id]);

        const newMessage = {
            ...result.rows[0],
            name: user.rows[0]?.name || 'Unknown',
            role: user.rows[0]?.role || 'student'
        };

        res.json(newMessage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
