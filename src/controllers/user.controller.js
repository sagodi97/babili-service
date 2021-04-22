import express from 'express';
import {
  createUser, getUsers, deleteUserById, getUserById,
} from '../services/user.service';

const userController = express.Router();

userController.get('/', getUsers);

userController.get('/:id', getUserById);

userController.post('/', createUser);

userController.delete('/:id', deleteUserById);

export default userController;
