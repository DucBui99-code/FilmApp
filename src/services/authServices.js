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
  sendOTP: async (userId) => {
    try {
      const response = await apiClient.post('/auth/sendOTP', userId);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  verifyOTP: async (data) => {
    try {
      const response = await apiClient.post(`/auth/verifyOTP`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthServices;
