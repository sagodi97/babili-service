import bcrypt from 'bcrypt';
import * as userDao from '../dao/user.dao';
import UnprocessableEntityError from '../utils/errors/badRequest.error';
import NotFoundError from '../utils/errors/notFoundError';
import validateUserSchema from '../schemas/user.schema';

export const getUsers = async () => userDao.getAll();

export const getUserById = async (id) => {
  const user = await userDao.getById(id);
  if (!user) {
    throw new NotFoundError();
  } else {
    return user;
  }
};

export const createUser = async (user) => {
  validateUserSchema(user);
  const usernameExists = await userDao.usernameExists(user.username);
  const emailExists = await userDao.usernameExists(user.email);
  if (usernameExists) {
    throw new UnprocessableEntityError(`Username ${user.username} already exists`);
  } else if (emailExists) {
    throw new UnprocessableEntityError(`The provided email address ${user.email} is already in use`);
  } else {
    const hash = await bcrypt.hash(user.password, 10);
    const newUser = await userDao.create({ ...user, password: hash });
    return newUser.ops[0];
  }
};

export const deleteUserById = async (id) => {
  const deleteOp = await userDao.deleteById(id);
  if (deleteOp.deletedCount === 0) {
    throw new NotFoundError();
  }
};
