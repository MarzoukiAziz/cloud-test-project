const { Client } = require('pg');

// Create a new client instance for connecting to the PostgreSQL database
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Connect to the database
client
  .connect()
  .then(async () => {
    console.log('Connected to PostgreSQL');
    await createTable(); // Call function to create the table after successful connection
  })
  .catch((err) => {
    console.error("Can't connect to PostgreSQL:", err.stack);
  });

// Function to create a 'projects' table if it doesn't already exist
const createTable = async () => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,        
        name VARCHAR(255) NOT NULL,   
        perimeter JSONB NOT NULL      
      );
    `;

  try {
    if (client.query) {
      await client.query(createTableQuery);
      console.log('Table "projects" created or already exists.');
    } else {
      throw new Error('Database client is not configured correctly.');
    }
  } catch (err) {
    console.error('Error creating table:', err.stack);
  }
};

module.exports = { client };
