// config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../config/logger.js';
const log = logger(import.meta.url);

dotenv.config();

const connectDB = async () => {
  if (process.env.NODE_ENV !== 'test') {
    try {
      await mongoose.connect(
        process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => log.debug('MongoDB connected...'))
      .catch((err) => log.error('MongoDB connection error:', err));
    } catch (err) {
      log.error(err.message);
      process.exit(1);
    }
  }
};  

export default connectDB;
