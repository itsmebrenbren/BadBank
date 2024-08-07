import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../dal/userDAL';

const jwtSecret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, userName, email, password, chequing, savings } = req.body;

  try {
    let user = await getUserByEmail(email);
    if (user) {
      res.status(400).json({ msg: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name: { firstName, lastName },
      userName,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      accounts: { chequing, savings }
    };

    user = await createUser(newUser);

    const payload = {
      user: {
        id: user!._id,
      },
    };

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    let user = await getUserByEmail(email);
    if (!user) {
      res.status(400).json({ msg: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ msg: 'Invalid credentials' });
      return;
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
