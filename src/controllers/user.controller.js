import express from 'express';
import {
  createUser, getUsers, deleteUserById, getUserById,
} from '../services/user.service';

const userController = express.Router();

userController.get('/', (req, res) => {
  try {
    const users = getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message ?? 'An error has occurred' });
  }
});

userController.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const userById = getUserById(id);
    if (userById) res.json(userById);
    else res.status(404).end();
  } catch (error) {
    res.status(500).json({ msg: error.message ?? 'An error has occurred' });
  }
});

userController.post('/', (req, res) => {
  const { body: newUser } = req;
  createUser(newUser);
  res.status(201).json({ msg: `User with username: ${newUser.username} was created!` });
});

userController.delete('/:id', (req, res) => {
  const { id } = req.params;
  deleteUserById(id);
  res.json({ msg: `User ${id} was deleted` });
});

export default userController;
