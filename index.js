import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import socket from './src/socket';
import userController from './src/controllers/user.controller';
import errorHandler from './src/middleware/errorHandler.middleware';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Server setup
const app = express();
const server = http.createServer(app);
// Attach socket to server
socket(server);
// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/users', userController);

// Errors middleware
app.use(errorHandler);

server.listen(PORT);
