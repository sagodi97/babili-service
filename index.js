import './readEnv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import expressPino from 'express-pino-logger';
import socket from './src/socket';
import logger from './src/utils/logger';
import errorHandler from './src/middleware/errorHandler.middleware';
import db from './src/db';

const expressLogger = expressPino({ logger });

const PORT = process.env.PORT || 3000;

const init = async () => {
  // DB setup
  await db.connect();
  const { default: userController } = await import('./src/controllers/user.controller');
  const { default: authController } = await import('./src/controllers/auth.controller');

  // Server setup
  const app = express();
  const server = http.createServer(app);

  // Attach socket to server
  socket(server);

  // Middleware
  app.use(expressLogger);
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  // Routes
  app.use('/users', userController);
  app.use('/auth', authController);

  // Errors middleware
  app.use(errorHandler);

  server.listen(PORT, () => {
    logger.info(`Server live on ${PORT}`);
  });
};

init();
