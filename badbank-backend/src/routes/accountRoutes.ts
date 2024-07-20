import express from 'express';
import { createAccount, depositToAccount } from '../dal/accountDAL';

const router = express.Router();

router.post('/account', async (req, res) => {
  try {
    const { userId, type } = req.body;
    const account = await createAccount(userId, type);
    res.status(201).json(account);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

router.post('/deposit', async (req, res) => {
  try {
    const { userId, amount, accountType } = req.body;
    const updatedAccount = await depositToAccount(userId, amount, accountType);
    res.status(200).json(updatedAccount);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

export default router;


