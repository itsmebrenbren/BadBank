import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbURI = "mongodb+srv://BrennaBaker:GuppyScuba2024@badbank.tvgccqu.mongodb.net/?retryWrites=true&w=majority&appName=BadBank"

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
