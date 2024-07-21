import { atom } from 'jotai';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  chequing: number;
  savings: number;
}

export const userAtom = atom<User | any | null>(null);
