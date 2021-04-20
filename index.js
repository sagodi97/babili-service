import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Server setup
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(cors());

// __dirname is not availble when using es6, get the dirname manually
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Serve temporary test client
app.get('/', (req, res) => {
  res.sendFile(`${dirname}/index.html`);
});

// Single test chat socket/event
io.on('connection', (socket) => {
  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });
});

server.listen(PORT);
