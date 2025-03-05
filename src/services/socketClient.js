import { io } from 'socket.io-client';

const socketClient = io('http://localhost:8000', {
  transports: ['websocket'],
});

export default socketClient;
