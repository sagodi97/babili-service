import { Router } from 'express';
import { authenticate } from '../services/auth.service';

const authController = Router();

authController.post('/login', async (req, res, next) => {
  try {
    const { body: creds } = req;
    const token = await authenticate(creds);
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

export default authController;
