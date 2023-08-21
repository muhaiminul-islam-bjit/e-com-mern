const mongoose = require('mongoose');

const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, options);
    console.log('Database connected successfully');

    mongoose.connection.on('error', error => {
      console.error('DB connection error: ', error);
    });
  } catch (error) {
    console.error('Could not connect: ', error.toString());
  }
};

module.exports = connectDB;
