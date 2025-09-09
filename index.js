// index.js
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./Routes/api'); 
const env = require('dotenv');
env.config();
const { connectDB, PORT } = require('./config/db'); // import both
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const net = require('net');
connectDB();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 1000,
  max: 20,
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
