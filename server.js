const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

app.get('/', (req, res) => {
  res.send('Lets gooooo');
});
app.get('/test', (req, res) => {
  res.send('Lets gdsooooo');
});

app.listen(PORT, () => {
  console.log(`teST Server is running on port ${PORT}`);
});
