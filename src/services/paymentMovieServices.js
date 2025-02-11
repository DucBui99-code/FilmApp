import apiClient from './apiClient';

const paymentMovieServices = {
  getPackgePublic: async () => {
    try {
      const response = await apiClient.get('/payment/packagePricePublic');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default paymentMovieServices;
