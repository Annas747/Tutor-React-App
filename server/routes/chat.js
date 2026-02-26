const express = require('express');
const router = express.Router();
// const { OpenAI } = require('openai'); // Uncomment when API key is available

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// Input sanitization helper
const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;

    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .trim()
        .substring(0, 2000); // Limit length
};

router.post('/', async (req, res) => {
    const { message } = req.body;

    // Validate input
    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required and must be a string' });
    }

    // Sanitize input
    const sanitizedMessage = sanitizeInput(message);

    if (sanitizedMessage.length === 0) {
        return res.status(400).json({ error: 'Message cannot be empty' });
    }

    try {
        // Check if we have a real API key (simple check)
        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'mock_key_for_demo' && !process.env.OPENAI_API_KEY.startsWith('your_')) {
            // Real usage
            /* 
            const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: "You are a helpful AI tutor." }, { role: "user", content: sanitizedMessage }],
                model: "gpt-3.5-turbo",
            });
            const answer = completion.choices[0].message.content;
            return res.json({ content: answer, sender: 'ai' });
            */
            // Fallback for now to avoid billing/errors if key is invalid
            throw new Error("API Key not configured");
        } else {
            // Mock Response
            console.log(`[Mock AI] Received: ${sanitizedMessage}`);
            setTimeout(() => {
                const mockAnswers = [
                    "That's an interesting question! To understand this, we need to look at...",
                    "Great point. Let me break that down for you...",
                    "Have you considered how this relates to the previous topic?",
                    "I can see you're working hard. Here's a hint: check the documentation for...",
                    "The answer depends on the context. In React, typically you would..."
                ];
                const randomAnswer = mockAnswers[Math.floor(Math.random() * mockAnswers.length)];

                res.json({
                    content: `[AI TUTOR]: ${randomAnswer} (Response to: "${sanitizedMessage}")`,
                    sender: 'ai'
                });
            }, 1000);
        }

    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

module.exports = router;
