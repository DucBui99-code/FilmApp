import axios from 'axios';

// Tạo một instance của axios
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/v1/MovieApp', // Base URL của API
  timeout: 10000, // Thời gian timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
