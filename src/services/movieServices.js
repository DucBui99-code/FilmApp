import getAuthToken from '../utils/getAuthToken';
import apiClient from './apiClient';

const movieServices = {
  getListMovie: async ({ page = 0, type }) => {
    try {
      const response = await apiClient.get('/movie/getListMovie', {
        params: {
          page: page,
          type: type,
        },
      });
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  getMovieBySlug: async (slug) => {
    try {
      const response = await apiClient.get(`/movie/getMovieDetail/${slug}`);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  getSingleEpisode: async (data) => {
    try {
      const response = await apiClient.post('/movie/getMovieEpisode', data, {
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
  getMoviePackage: async (data) => {
    try {
      const response = await apiClient.get(
        `/payment/packagePrice?movieId=${data}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  buyPackageMonth: async (data) => {
    try {
      const response = await apiClient.post('/bill/createBillPackMonth', data, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  buyPackageSingle: async (data) => {
    try {
      const response = await apiClient.post('/bill/createBillPackRent', data, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  checkBill: async (data) => {
    try {
      const response = await apiClient.post('/bill/checkBill', data, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  cancelledBill: async (data) => {
    try {
      const response = await apiClient.post('/bill/cancelBill', data, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
};

export default movieServices;
