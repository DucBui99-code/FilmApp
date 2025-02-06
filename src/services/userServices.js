import apiClient from './apiClient';

const UserServices = {
  getProfile: async (token) => {
    try {
      const response = await apiClient.get('/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default UserServices;
