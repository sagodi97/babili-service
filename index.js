import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import socket from './src/socket';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Server setup
const app = express();
const server = http.createServer(app);
// Attach socket to server
socket(server);
// Middleware ??
app.use(cors());

server.listen(PORT);
