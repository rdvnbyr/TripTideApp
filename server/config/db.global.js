const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => {
      console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    })
    .catch((err) => console.error(`Error: ${err.message}`.red));
};

module.exports = connectDB;
