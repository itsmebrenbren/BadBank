import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const router = express.Router();

router.post('/api/auth/register', registerUser);
router.post('/api/auth/login', loginUser);

export default router;

