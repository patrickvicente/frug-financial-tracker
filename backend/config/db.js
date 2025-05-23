const { Pool } = require('pg'); // Import Pool from pg package
require('dotenv').config(); // Loads environment variables from a .env file

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

module.exports = pool; 