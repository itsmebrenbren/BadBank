import { atom } from 'jotai';

export const userAtom = atom([
  {
    firstName: 'Babs',
    lastName: 'Uncle',
    email: 'unclebabs@gmail.com',
    password: 'Password123#'
  },
  {
    firstName: 'Steve',
    lastName: 'Stupid',
    email: 'thisisstupid@gmail.com',
    password: 'Notsecure543!'
  }
]);

export const accountAtom = atom(
  {
    balance: 1000.00
  }
);