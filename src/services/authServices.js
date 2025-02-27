import getAuthToken from '../utils/getAuthToken';
import apiClient from './apiClient';
import apiGoogle from './apiGoogle';

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
  loginByGoole: async (data) => {
    try {
      const response = await apiClient.post('/auth/loginByGoogle', data);
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
  forgotPassword: async (data) => {
    try {
      const response = await apiClient.post(`/auth/forgotPassword`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  resetPassword: async (data) => {
    try {
      const response = await apiClient.post(`/auth/resetPassword`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  connectGoogleClooud: async (token) => {
    try {
      const response = await apiGoogle.get(`/userinfo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  changePassword: async (data) => {
    try {
      const response = await apiClient.post('/auth/changePassword', data, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  deleteAccount: async () => {
    try {
      const response = await apiClient.post(
        `/auth/removeMySelf`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthServices;
