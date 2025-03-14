import { io } from 'socket.io-client';
import getAuthToken from '../utils/getAuthToken';

const socketClient = io('https://shopshoes.io.vn', {
  transports: ['websocket'],
  auth: { token: getAuthToken() },
});

export default socketClient;
