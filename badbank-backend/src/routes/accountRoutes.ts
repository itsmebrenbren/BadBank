import express from 'express';
import { authenticateToken } from '../authMiddleware';
import { updateAccountBalance } from '../dal/userDAL';
import { getUserById } from '../dal/userDAL';

const router = express.Router();

router.post('/api/accounts/deposit', authenticateToken, async (req, res) => {
  try {
    const { amount, accountType } = req.body;
    const userID = req.user!.id;

    console.log('Deposit request by user:', userID, 'Amount:', amount, 'Account Type:', accountType);

    const updatedUser = await updateAccountBalance(userID, accountType, amount);

    if (!updatedUser) {
      console.log('User not found for ID:', userID);
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Deposit error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.post('/api/accounts/withdraw', authenticateToken, async (req, res) => {
  try {
    const { amount, accountType } = req.body;
    const userId = req.user!.id;

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (accountType === 'chequing' && user.accounts.chequing < amount) {
      return res.status(400).json({ message: 'Insufficient funds in chequing account' });
    } else if (accountType === 'savings' && user.accounts.savings < amount) {
      return res.status(400).json({ message: 'Insufficient funds in savings account' });
    }

    const updatedUser = await updateAccountBalance(userId, accountType, -amount);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Withdraw error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
