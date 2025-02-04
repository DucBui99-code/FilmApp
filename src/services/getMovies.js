import apiClient from './apiClient';

const getMoviesServices = {
  getList: async ({ page = 0 }) => {
    try {
      const response = await apiClient.get('/movie/getListMovie', {
        params: {
          page: page,
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
};

export default getMoviesServices;
