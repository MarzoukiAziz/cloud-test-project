const express = require('express');
const dotenv = require('dotenv');
const app = express();

const PORT = process.env.PORT || 80;

const environment = process.env.NODE_ENV || 'dev';
dotenv.config({ path: `.env.${environment}` });

app.use(express.json());

// Connect to database
require('./db');

// Import and use project routes
const projectRoutes = require('./routes/projectRoutes');
app.use('/projects', projectRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
