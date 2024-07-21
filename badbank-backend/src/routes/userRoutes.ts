// import express from 'express';
// import { getUserById } from '../dal/userDAL';

// const router = express.Router();

// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await getUserById(id);
//     const accounts = await getAccountsByUserId(id);
//     res.status(200).send({ user, accounts });
//   } catch (error) {
//       res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
//     }
// });

// export default router;


