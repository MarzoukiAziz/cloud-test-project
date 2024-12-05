const express = require('express');
const { createTable } = require('./db');

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

//Configuring Dotenv to use environment variables from .env file
const dotenv = require('dotenv');
const environment = process.env.NODE_ENV || 'dev';
dotenv.config({ path: `.env.${environment}` });

// Routes
const projectRoutes = require('./routes/projectRoutes');
app.use('/projects', projectRoutes);

app.get('/test', (req, res) => {
  res.send(environment + ' n3wdo men jdid');
});

// (async () => {
//   try {
//     await createTable();
//     app.listen(PORT, () => {
//       console.log(`Server is running on Port ${PORT}`);
//     });
//   } catch (error) {
//     console.error('Failed to start server:', error);
//   }
// })();

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
