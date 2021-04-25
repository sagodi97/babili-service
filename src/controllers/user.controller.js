import express from 'express';
import {
  createUser, getUsers, getUserById, deleteUserById,
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
    const userCreated = await createUser(newUser);
    res.status(201).json(userCreated);
  } catch (error) {
    next(error);
  }
});
// TODO: implement
userController.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteUserById(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default userController;
