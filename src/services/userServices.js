import getAuthToken from '../utils/getAuthToken';
import apiClient from './apiClient';

const UserServices = {
  getProfile: async (type = 0) => {
    try {
      const response = await apiClient.get(`/user/profile?type=${type}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  editProfile: async (data) => {
    try {
      const response = await apiClient.post(`/user/updateInfo`, data, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  uploadAvatar: async (data) => {
    try {
      const response = await apiClient.post(`/user/uploadAvatar`, data, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  toggleFavoriteMovie: async (data) => {
    try {
      const response = await apiClient.post(`/user/toggleFavoriteMovie`, data, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  removeDevice: async (data) => {
    // Xóa thiết bị
    try {
      const response = await apiClient.post(`/user/removeDevice`, data, {
        headers: {
          // Gửi token qua header
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default UserServices;
