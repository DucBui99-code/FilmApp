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
  getRandomMovieLive: async () => {
    try {
      const response = await apiClient.get(`/movie/geRandomLiveMovie`);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  getMovieByCountry: async ({ page = 1, country }) => {
    try {
      const response = await apiClient.get('/movie/getMovieByCountry', {
        params: {
          page,
          country,
        },
      });
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  getMovieByType: async ({ page = 1, type }) => {
    try {
      const response = await apiClient.get('/movie/getMovieByType', {
        params: {
          page,
          type,
        },
      });
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  getMovieByCategory: async ({ page = 0, category }) => {
    try {
      const response = await apiClient.get('/movie/getMovieByCategory', {
        params: {
          page,
          category,
        },
      });
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  getliveComments: async (movieId) => {
    try {
      const response = await apiClient.get(`/movie/getLiveComments/${movieId}`);
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

  addRateMovie: async (data) => {
    try {
      const response = await apiClient.post('/movie/rateMovie', data);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  getRateMovie: async (movieId, page = 1) => {
    try {
      const response = await apiClient.get(
        `/movie/getRateMovie/${movieId}?page=${page}`
      );
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  getMoviePackage: async (data) => {
    try {
      const response = await apiClient.get(
        `/payment/packagePrice?movieId=${data}`
      );
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  searchMovie: async (query, page = 1) => {
    try {
      const response = await apiClient.get(
        `/movie/searchMovie?q=${query}&page=${page}`
      );
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  buyPackageMonth: async (data) => {
    try {
      const response = await apiClient.post('/bill/createBillPackMonth', data);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  buyPackageSingle: async (data) => {
    try {
      const response = await apiClient.post('/bill/createBillPackRent', data);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  checkBill: async (data) => {
    try {
      const response = await apiClient.post('/bill/checkBill', data);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  cancelledBill: async (data) => {
    try {
      const response = await apiClient.post('/bill/cancelBill', data);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  postComment: async (data) => {
    try {
      const response = await apiClient.post('/user/addCommentMovie', data);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  getCommentByMovieId: async (movieId, page = 1) => {
    try {
      const response = await apiClient.get(
        `/movie/getMovieComments/${movieId}?page=${page}`
      );
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  getReplisByCommentId: async (commentId, page = 1) => {
    try {
      const response = await apiClient.get(
        `/movie/getReplyComments/${commentId}?page=${page}`
      );
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  deleteComment: async (data) => {
    try {
      const response = await apiClient.post('/user/deleteCommentMovie', data);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  editComment: async (data) => {
    try {
      const response = await apiClient.post('/user/editCommentMovie', data);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  toggleReactionComment: async (data) => {
    try {
      const response = await apiClient.post('/user/actionCommentMovie', data);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
};

export default movieServices;
