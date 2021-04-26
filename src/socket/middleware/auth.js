import { validateToken } from '../../services/auth.service';

const socketAuth = async (socket, next) => {
  try {
    const { token } = socket.handshake.auth;
    const { sub, username } = await validateToken(token);
    // eslint-disable-next-line no-param-reassign
    socket.userId = sub;
    // eslint-disable-next-line no-param-reassign
    socket.username = username;
    next();
  } catch (error) {
    next(error);
  }
};

export default socketAuth;
