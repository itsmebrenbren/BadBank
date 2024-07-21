import dotenv from 'dotenv';
dotenv.config();  

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use('', authRoutes);
app.use('', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
