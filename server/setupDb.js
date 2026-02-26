const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const setupDb = async () => {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Running schema.sql...');
        await pool.query(schemaSql);
        console.log('Database setup complete!');
    } catch (err) {
        console.error('Error setting up database:', err.message);
        console.log('⚠️ Could not connect to PostgreSQL. Skipping database creation.');
        console.log('   Ensure PostgreSQL is running and DATABASE_URL is correct in .env');
    } finally {
        await pool.end();
    }
};

setupDb();
