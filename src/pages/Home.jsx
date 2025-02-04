import React, { useEffect, useState } from 'react';
import Slider from '../components/body/Slider';
import SliderStatic from '../components/body/SliderStatic';
import getMoviesServices from '../services/getMovies';
import SliderHover from '../components/body/SliderHover';
import LoadingOverlay from '../components/Loading/LoadingOverlay';

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
    const timeout = setTimeout(() => {
      fetchMovies(1);
      fetchMovies(2);
      fetchMovies(3);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      <Slider data={moviesData[1]}></Slider>
      <SliderStatic
        title={'Phim hay mỗi ngày'}
        data={moviesData[2]}
      ></SliderStatic>
      <SliderHover title="TOP 10 TRONG NGÀY" data={moviesData[3]}></SliderHover>
    </div>
  );
}

export default Home;
