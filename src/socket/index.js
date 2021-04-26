import { Server } from 'socket.io';
import socketAuth from './middleware/auth';

export default (server) => {
  const io = new Server(server, { cors: { origin: '*' } });

  io.use(socketAuth);
  const connectedUsers = [];
  // Single test chat socket/event
  io.on('connection', (socket) => {
    const { userId, username } = socket;
    socket.join(userId);
    connectedUsers.push({ userId, username });

    socket.broadcast.emit('connection activity', { type: 'joined', who: username });

    io.emit('users', connectedUsers);

    socket.on('chat message', (data) => {
      io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('connection activity', { type: 'left', who: username });
      const i = connectedUsers.findIndex((u) => u.userId === socket.userId);
      if (!i) return;
      connectedUsers.splice(i, 1);
      io.emit('users', connectedUsers);
    });
  });
  return io;
};
