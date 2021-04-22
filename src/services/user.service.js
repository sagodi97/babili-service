import UnprocessableEntityError from '../utils/errors/badRequest.error';
import NotFoundError from '../utils/errors/notFoundError';

const users = [];

export const getUsers = () => users;

export const getUserById = (id) => users.find((user) => user.username === id) ?? null;

export const createUser = (newUser) => {
  const foundUser = users.find((user) => user.username === newUser.username);
  if (foundUser) {
    throw new UnprocessableEntityError(`Username ${foundUser.username} already exists`);
  } else users.push(newUser);
};

export const deleteUserById = (id) => {
  const userToDeleteIndex = users.findIndex((user) => user.username === id);
  if (userToDeleteIndex !== -1) {
    users.splice(userToDeleteIndex, 1);
  } else {
    throw new NotFoundError();
  }
};
