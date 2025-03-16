import { io } from 'socket.io-client';
import getAuthToken from '../utils/getAuthToken';

const socketClient = io(`${process.env.REACT_APP_API_URL}`, {
  transports: ['websocket'],
  auth: { token: getAuthToken() },
});

export default socketClient;
