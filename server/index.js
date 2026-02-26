const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const pool = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Headers
app.use(helmet());

// Rate limiting for API endpoints
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: 'Too many login attempts, please try again later.'
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Limit payload size
app.use('/api/', limiter); // Apply rate limiting to all API routes

// Routes
app.use('/api/auth', authLimiter, require('./routes/auth')); // Stricter rate limiting for auth
app.use('/api/chat', require('./routes/chat'));
app.use('/api/messages', require('./routes/messages'));
const errorHandler = require('./middleware/errorMiddleware');

// ... routes ...

// Uploads or other routes
// app.use('/api/courses', require('./routes/courses'));

app.get('/', (req, res) => {
    res.send('AI Education Platform API is running');
});

// Test DB Connection
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'Database connected successfully', time: result.rows[0]?.now || 'Mock Mode' });
    } catch (err) {
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// 404 Handler
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
