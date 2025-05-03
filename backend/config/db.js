const mysql = require('mysql2');
require('dotenv').config();

// ✅ Use mysql2's promise-based connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).promise(); // ✅ Enable Promises

db.getConnection()
    .then(() => console.log('✅ Connected to MySQL'))
    .catch(err => console.error('Database connection failed:', err));

module.exports = db;
