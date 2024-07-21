import dotenv from 'dotenv';
dotenv.config();  

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import accountRoutes from './routes/accountRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);
app.use('', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
