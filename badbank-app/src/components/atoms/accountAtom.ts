import { atom } from 'jotai';

export interface Account {
  userId: string;
  chequing: number;
  savings: number;
}

export const accountAtom = atom<Account | any | null>(null);