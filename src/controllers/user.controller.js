import express from 'express';
import {
  createUser, getUsers, getUserById,
} from '../services/user.service';

const userController = express.Router();

userController.get('/', async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

userController.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const userById = await getUserById(id);
    res.json(userById);
  } catch (error) {
    next(error);
  }
});

userController.post('/', async (req, res, next) => {
  try {
    const { body: newUser } = req;
    await createUser(newUser);
    res.status(201).json({ msg: `User with username: ${newUser.username} was created!` });
  } catch (error) {
    next(error);
  }
});
// TODO: implement
userController.delete('/:id', (req, res) => {
  const { id } = req.params;
  // deleteUserById(id);
  res.json({ msg: `User ${id} was deleted` });
});

export default userController;
