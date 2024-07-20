import Account from '../models/account';

export const createAccount = async (userId: string, type: string) => {
  const account = new Account({ userId, type });
  await account.save();
  return account;
};

export const getAccountsByUserId = async (userId: string) => {
  return await Account.find({ userId });
};
