import { atom } from 'jotai';

export interface User {
  id: string;
  name: {
    firstName: string;
    lastName: string;
  }
  userName: string;
  email: string;
  accounts: {
    chequing: number;
    savings: number;
  }
}

export const userAtom = atom<User | null>({
  id: '',
  name: {
    firstName: '',
    lastName: ''
  },
  userName: '',
  email: '',
  accounts: {
    chequing: 0,
    savings: 0
  }
});

