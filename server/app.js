const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fs = require('fs');
const connectDB = require('./config/db.global');
const path = require('path');
require('colors');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'app.log'), {
  flags: 'a',
});

const app = express();
dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

// Init Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/assets')));
app.use(morgan('combined', { stream: accessLogStream }));

// Routes
app.use('/api/users', require('./routes/user'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
