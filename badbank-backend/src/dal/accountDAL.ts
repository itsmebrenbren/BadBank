import Account, { IAccount } from '../models/account';

export const createAccount = async (userId: string, type: string) => {
  const account = new Account({ userId, type });
  await account.save();
  return account;
};

export const getAccountsByUserId = async (userId: string) => {
  return await Account.find({ userId });
};

export const depositToAccount = async (userId: string, amount: number, accountType: 'chequing' | 'savings'): Promise<IAccount> => {
  const account = await Account.findOne({ userId, type: accountType });
  if (!account) {
    throw new Error('Account not found');
  }
  account.balance += amount;
  await account.save();
  return account;
};

