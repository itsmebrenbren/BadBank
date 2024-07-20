import express from 'express';
import { getUserById } from '../dal/userDal';
import { getAccountsByUserId } from '../dal/accountDal';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    const accounts = await getAccountsByUserId(id);
    res.status(200).json({ user, accounts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;


