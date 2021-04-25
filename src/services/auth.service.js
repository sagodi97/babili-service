import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userDao from '../dao/user.dao';
import validateLoginSchema from '../schemas/login.schema';
import NotFoundError from '../utils/errors/notFoundError';
import UnauthorizedError from '../utils/errors/unauthorized.error';

export const authenticate = async (creds) => {
  validateLoginSchema(creds);
  const { email, password } = creds;
  const user = await userDao.getByEmail(email);
  if (!user) {
    throw new NotFoundError();
  } else {
    const { JWT_SECRET } = process.env;
    const matchingPassword = await bcrypt.compare(password, user.password);
    if (matchingPassword) {
      return jwt.sign({ sub: user.id }, JWT_SECRET);
    }
    throw new UnauthorizedError();
  }
};

export const validateToken = async (token) => {
  if (!token) {
    throw new UnauthorizedError();
  }
  const { JWT_SECRET } = process.env;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new UnauthorizedError();
  }
};
