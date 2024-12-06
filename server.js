const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

//Configuring Dotenv to use environment variables from .env file
const dotenv = require('dotenv');
const environment = process.env.NODE_ENV || 'dev';
dotenv.config({ path: `.env.${environment}` });
console.log('env : ' + environment);

// DB
require('./db');

// Routes
const projectRoutes = require('./routes/projectRoutes');
app.use('/projects', projectRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
