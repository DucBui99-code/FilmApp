import axios from 'axios';
import store from '../store/store';
import Cookies from 'js-cookie';
import { logout } from '../store/authSlice';

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/v1/MovieApp`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // BẮT BUỘC phải có
});

// Kiểm tra nếu là mobile
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

apiClient.interceptors.request.use((config) => {
  if (isMobile) {
    // Fix cho Chrome mobile
    config.headers['Sec-Fetch-Site'] = 'none';
    config.headers['Sec-Fetch-Mode'] = 'cors';
    config.headers['Sec-Fetch-Dest'] = 'empty';

    // Đính kèm token chỉ khi là mobile
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      Cookies.remove('access_token');
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default apiClient;
