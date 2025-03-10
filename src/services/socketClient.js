import { io } from 'socket.io-client';
import getAuthToken from '../utils/getAuthToken';

const socketClient = io('http://localhost:8000', {
  transports: ['websocket'],
  auth: { token: getAuthToken() },
});

export default socketClient;
