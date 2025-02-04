import apiClient from './apiClient';

const AuthServices = {
  registerAccount: async (data) => {
    try {
      const response = await apiClient.post('/auth/register', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  loginAccount: async (data) => {
    try {
      const response = await apiClient.post('/auth/login', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthServices;
