import apiClient from "./apiClient";

const getMoviesServices = {
  getList: async ({ page = 0 }) => {
    try {
      const response = await apiClient.get("/danh-sach/phim-moi-cap-nhat", {
        params: {
          page: page,
          limit: 5,
        },
      });
      return response.data;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  },
  getMovieBySlug: async ({ slug }) => {
    try {
      const response = await apiClient.get(`/phim/${slug}`);
      return response.data;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  },
};

export default getMoviesServices;
