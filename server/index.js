const express = require('express');
const cors = require('cors');
const path = require('path');
const { client, seed } = require('./db');
const apiRouter = require('./api');

const app = express();

const allowedOrigins = [
  process.env.LOCAL_FRONTEND_URL || "http://localhost:5173",
  process.env.DEPLOYED_FRONTEND_URL || "https://nba-debates.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());


app.use('/api', apiRouter);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
app.use('/assets', express.static(path.join(__dirname, '../client/dist/assets')));


app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send({ error: err.message || err });
});


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
