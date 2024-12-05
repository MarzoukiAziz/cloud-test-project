require('dotenv').config();
const express = require('express');
const { createTable } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
const projectRoutes = require('./routes/projectRoutes');
app.use('/projects', projectRoutes);

app.get('/test', (req, res) => {
  res.send('Its working :)');
});

(async () => {
  try {
    await createTable();
  } catch (error) {
    console.error('Failed to start server:', error);
  }
  app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
  });
})();
