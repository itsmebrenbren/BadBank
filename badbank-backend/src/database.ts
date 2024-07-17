import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(dbURI)
  .then(() => {
    console.log('Database connection established');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

const db = mongoose.connection;

db.on('disconnected', () => {
  console.log('Database connection disconnected');
});

export default db;
