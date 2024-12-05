require('dotenv').config();
const express = require('express');
const { createTable } = require('./db');

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

// Routes
const projectRoutes = require('./routes/projectRoutes');
app.use('/projects', projectRoutes);

app.get('/test', (req, res) => {
  res.send('rahi tnakt ' + process.env.DB_HOST);
});

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
