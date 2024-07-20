import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { createUser, getUserByEmail } from '../dal/userDal';
import User, { IUser } from '../models/user';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, userName, email, password } = req.body;

  try {
    let user: IUser | null = await getUserByEmail(email);
    if (user) {
      res.status(400).json({ msg: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await createUser({
      name: { firstName, lastName },
      userName,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    let user: IUser | null = await getUserByEmail(email);
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
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    res.status 500).send('Server error');
  }
};

