const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

//Configuring Dotenv to use environment variables from .env file
const dotenv = require('dotenv');
const environment = process.env.NODE_ENV || 'local';
dotenv.config({ path: `.env.${environment}` });
console.log('env : ' + environment);

// DB
const { createTable } = require('./db');

// Routes
const projectRoutes = require('./routes/projectRoutes');
app.use('/projects', projectRoutes);

(async () => {
  try {
    await createTable();
    app.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
})();
