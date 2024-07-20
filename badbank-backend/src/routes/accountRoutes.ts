import express from 'express';
import { createAccount } from '../dal/accountDal';

const router = express.Router();

router.post('/account', async (req, res) => {
  try {
    const { userId, type } = req.body;
    const account = await createAccount(userId, type);
    res.status(201).json(account);
  } catch (err = error as Error) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
