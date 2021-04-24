import * as userDao from '../dao/user.dao';
import UnprocessableEntityError from '../utils/errors/badRequest.error';
import NotFoundError from '../utils/errors/notFoundError';
import validateUserSchema from '../schemas/user.schema';

export const getUsers = () => userDao.getAll();

export const getUserById = async (id) => {
  const user = await userDao.getById(id);
  if (!user) {
    throw new NotFoundError();
  } else {
    return user;
  }
};

export const createUser = async (newUser) => {
  validateUserSchema(newUser);
  const usernameExists = await userDao.usernameExists(newUser.username);
  const emailExists = await userDao.usernameExists(newUser.email);
  if (usernameExists) {
    throw new UnprocessableEntityError(`Username ${newUser.username} already exists`);
  } else if (emailExists) {
    throw new UnprocessableEntityError(`The provided email address ${newUser.email} is already in use`);
  } else {
    return userDao.create(newUser);
  }
};
