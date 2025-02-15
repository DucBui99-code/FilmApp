import axios from 'axios';

const apiGoogle = axios.create({
  baseURL: 'https://www.googleapis.com/oauth2/v3',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiGoogle;
