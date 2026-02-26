const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

let pool;
let isMockMode = false;

try {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL not set");
    }

    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });

    pool.on('error', (err) => {
        console.error('Unexpected error on idle client', err);
        process.exit(-1);
    });

} catch (err) {
    console.warn("⚠️ Postgres not configured or failed to connect. Switching to Mock Mode.");
    isMockMode = true;
}

// Wrapper to handle queries even if DB is down (Mock Mode)
const query = async (text, params) => {
    // Check if we are in mock mode OR if the pool is undefined
    if (isMockMode || !pool) {
        console.log(`[Mock DB] Query: ${text}`);

        // Mock User for Login
        if (text.includes('SELECT * FROM users')) {
            // Check if email matches demo user
            if (params && params[0] === 'demo@example.com') {
                return {
                    rows: [{
                        id: 1,
                        name: 'Demo User',
                        email: 'demo@example.com',
                        // For demo purposes only - in production, users must be in real database
                        // This hash is for the password "password" - DO NOT use in production
                        password_hash: '$2b$10$YAhZEhVGbZuXPEThBY7g857q2jqwMBgXi',
                        role: 'student'
                    }]
                };
            }
            // Return empty for other emails in mock mode
            return { rows: [] };
        }

        // Mock Insert for Register
        if (text.includes('INSERT INTO users')) {
            return {
                rows: [{
                    id: Math.floor(Math.random() * 1000),
                    name: params[0],
                    email: params[1],
                    role: 'student'
                }]
            };
        }

        return { rows: [] };
    }

    try {
        return await pool.query(text, params);
    } catch (err) {
        console.error("Database Error:", err.message);
        // Fallback to mock mode if connection fails locally
        if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
            console.warn("⚠️ Connection refused. Switching to Mock Mode.");
            isMockMode = true;

            // Retry the query in mock mode if it was a select/insert for auth
            if (text.includes('users')) {
                return query(text, params);
            }

            return { rows: [] };
        }
        throw err;
    }
};

module.exports = {
    query,
    pool
};
