import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import accountRoutes from './routes/accountRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/badbank');

app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
