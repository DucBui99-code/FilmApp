import apiClient from './apiClient';

const UserServices = {
  getProfile: async (token, type = 0) => {
    try {
      const response = await apiClient.get(`/user/profile?type=${type}`, {
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
