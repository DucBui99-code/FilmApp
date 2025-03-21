import apiClient from './apiClient';

const UserServices = {
  getProfile: async (type = 0, page = 1, limit = 5) => {
    try {
      const response = await apiClient.get(
        `/user/profile?type=${type}&limit=${limit}&page=${page}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  editProfile: async (data) => {
    try {
      const response = await apiClient.post(`/user/updateInfo`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  uploadAvatar: async (data) => {
    try {
      const response = await apiClient.post(`/user/uploadAvatar`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  toggleFavoriteMovie: async (data) => {
    try {
      const response = await apiClient.post(`/user/toggleFavoriteMovie`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  removeDevice: async (data) => {
    // Xóa thiết bị
    try {
      const response = await apiClient.post(`/user/removeDevice`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getMyNotification: async (page = 1) => {
    try {
      const response = await apiClient.get(
        `/user/getMyNotification?page=${page}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getCountNotification: async () => {
    try {
      const response = await apiClient.get(`/user/getCountNotification`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  readNotification: async (data) => {
    try {
      const response = await apiClient.post(`/user/readNotification`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  readAllNotification: async () => {
    try {
      const response = await apiClient.post(`/user/readAllNotification`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  hidenNotification: async (data) => {
    try {
      const response = await apiClient.post(`/user/hidenNotification`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default UserServices;
