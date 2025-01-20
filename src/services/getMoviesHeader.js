import apiClient from "./apiClient";

const getMoviesHeaderServices = {
  getList: () => {
    return apiClient.get("/danh-sach/phim-moi-cap-nhat", {
      params: {
        page: 0,
        limit: 5,
      },
    });
  },
};

export default getMoviesHeaderServices;
