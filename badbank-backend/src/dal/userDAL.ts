import { ObjectId } from 'mongodb';
import client from '../database';

const db = client.db('Badbank');
const usersCollection = db.collection('users');

export const getUserById = async (id: string) => {
  return await usersCollection.findOne({ _id: new ObjectId(id) });
};

export const getUserByEmail = async (email: string) => {
  return await usersCollection.findOne({ email });
};

export const createUser = async (userData: any) => {
  const result = await usersCollection.insertOne(userData);
  return { ...userData, _id: result.insertedId };
};


