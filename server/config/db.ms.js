const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const conn = mongoose.createConnection(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

conn.on('connected', () => {
  console.log('MongoDB connection established successfully'.green);
});
conn.on('error', (err) => {
  console.error('MongoDB connection error:'.red, err);
});
conn.on('disconnected', () => {
  console.log('MongoDB connection disconnected'.yellow);
});
conn.on('reconnected', () => {
  console.log('MongoDB connection reestablished'.green);
});
conn.on('close', () => {
  console.log('MongoDB connection closed'.red);
});
conn.on('timeout', () => {
  console.log('MongoDB connection timeout'.red);
});
conn.on('open', () => {
  console.log('MongoDB connection opened'.green);
});

module.exports = conn;
