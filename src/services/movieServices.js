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
      const response = await apiClient.post('/movie/getMovieEpisode', data);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  getMoviePackage: async (data) => {
    try {
      const response = await apiClient.get(`/payment/packagePrice?movieId=${data}`);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  }
};

export default movieServices;
