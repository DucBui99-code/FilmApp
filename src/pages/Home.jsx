import React, { useEffect, useState } from "react";
import Slider from "../components/body/Slider";
import SliderStatic from "../components/body/SliderStatic";
import getMoviesServices from "../services/getMovies";
import SliderHover from "../components/body/SliderHover";

function Home() {
  const [moviesData, setMoviesData] = useState({}); // Lưu trữ kết quả theo từng trang

  const fetchMovies = async (page) => {
    try {
      const res = await getMoviesServices.getList({ page });
      setMoviesData((prev) => ({
        ...prev,
        [page]: {
          items: res.items,
          pathImage: res.pathImage,
        },
      }));
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
    }
  };

  useEffect(() => {
    fetchMovies(1); // Lấy dữ liệu trang 1
    fetchMovies(2); // Lấy dữ liệu trang 2
  }, []);

  return (
    <div>
      <Slider></Slider>
      <SliderStatic
        title={"Phim hay mỗi ngày"}
        data={moviesData[1]}
      ></SliderStatic>
      <SliderHover title="TOP 10 TRONG NGÀY" data={moviesData[2]}></SliderHover>
    </div>
  );
}

export default Home;
