const express = require('express');
const cors = require('cors');
const path = require('path');
const { client, seed } = require('./db');
const apiRouter = require('./api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRouter);

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
app.use('/assets', express.static(path.join(__dirname, '../client/dist/assets')));

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send({ error: err.message || err });
});

// Server initialization
const init = async () => {
  const PORT = process.env.PORT || 3000;
  await client.connect();
  console.log('connected to database');
  if (process.env.SYNC) {
    await seed();
  }
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
};

init();
