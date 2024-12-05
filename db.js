const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Function to create a table
const createTable = async () => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        perimeter JSONB NOT NULL
      );
    `;

  try {
    if (pool.query) {
      await pool.query(createTableQuery);
      console.log('Table "projects" created or already exists.');
    } else {
      throw new Error('Database pool is not configured correctly.');
    }
  } catch (err) {
    console.error('Error creating table:', err.stack);
  }
};

module.exports = { pool, createTable };
