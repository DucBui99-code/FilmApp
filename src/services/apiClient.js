import axios from 'axios';
import store from '../store/store';
import Cookies from 'js-cookie';
import { logout } from '../store/authSlice';

// Tạo một instance của axios
const apiClient = axios.create({
  baseURL: 'https://shopshoes.io.vn/v1/MovieApp', // Base URL của API
  timeout: 10000, // Thời gian timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response, // Nếu thành công thì trả về response
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        Cookies.remove('token');
        store.dispatch(logout());
      }
    }
    return Promise.reject(error); // Trả lỗi về để xử lý tiếp
  }
);

export default apiClient;
