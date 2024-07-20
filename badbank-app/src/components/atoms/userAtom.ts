import { atom } from 'jotai';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}

export const userAtom = atom<User | any | null>(null);
