import { validateToken } from '../services/auth.service';
import UnauthorizedError from '../utils/errors/unauthorized.error';

/* eslint-disable no-unused-vars */
export default async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token || typeof token !== 'string') throw new UnauthorizedError();
    await validateToken(token.substring(7));
    next();
  } catch (error) {
    next(error);
  }
};
