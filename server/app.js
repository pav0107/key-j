const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();

app.use(express.json());

app.use('/api/', require('./routes/root'));

app.use(express.static(path.join('build')));

app.get((req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}/`;
  console.log(`Listening on ${url}`);
});
