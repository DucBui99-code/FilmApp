import axios from 'axios';
import store from '../store/store';
import Cookies from 'js-cookie';
import { logout } from '../store/authSlice';

// Tạo một instance của axios
const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/v1/MovieApp`, // Base URL của API
  timeout: 10000, // Thời gian timeout
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Thêm header đặc biệt
  },
  withCredentials: true, // Gửi cookie cùng request
});

// Xử lý riêng cho mobile
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  apiClient.defaults.withCredentials = true;
  apiClient.interceptors.request.use((config) => {
    config.headers['Sec-Fetch-Site'] = 'none'; // Thêm header bảo mật
    return config;
  });
}

apiClient.interceptors.response.use(
  (response) => response, // Nếu thành công thì trả về response
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        Cookies.remove('access_token'); // Xóa token khỏi cookie
        store.dispatch(logout());
      }
    }
    return Promise.reject(error); // Trả lỗi về để xử lý tiếp
  }
);

export default apiClient;
