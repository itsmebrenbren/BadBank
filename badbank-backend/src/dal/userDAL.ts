import User, { IUser } from '../models/user';

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

export const createUser = async (userData: IUser): Promise<IUser> => {
  const user = new User(userData);
  return await user.save();
};


