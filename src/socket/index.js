import { Server } from 'socket.io';
import socketAuth from './middleware/auth';

export default (server) => {
  const io = new Server(server, { cors: { origin: '*' } });

  io.use(socketAuth);

  // Single test chat socket/event
  io.on('connection', (socket) => {
    socket.broadcast.emit('connection activity', 'joined');
    socket.on('chat message', (data) => {
      io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('connection activity', 'left');
    });
  });
  return io;
};
