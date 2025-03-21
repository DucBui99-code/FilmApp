import { io } from 'socket.io-client';

const socketClient = io(`${process.env.REACT_APP_API_URL}`, {
  transports: ['websocket'],
  withCredentials: true,
});

export default socketClient;
