import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Slider from '../components/Body/Slider';
import SliderStatic from '../components/Body/SliderStatic';
import MoviesServices from '../services/movieServices';
import SliderHover from '../components/Body/SliderHover';
import { useAlert } from '../components/Message/AlertContext';
import { setLoading } from '../store/appStore';
import getErrorMessage from '../utils/handelMessageError';

function Home({ type }) {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  const [moviesData, setMoviesData] = useState({}); // Lưu trữ kết quả theo từng trang

  const fetchMovies = async (page, type) => {
    try {
      const res = await MoviesServices.getListMovie({ page, type });
      setMoviesData((prev) => ({
        ...prev,
        [page]: {
          items: res.items,
          pathImage: res.pathImage,
        },
      }));
    } catch (error) {
      showAlert(getErrorMessage(error), 'error');
    }
  };

  useEffect(() => {
    let isMounted = true; // Cờ kiểm tra component còn mounted
    setMoviesData({}); // Reset dữ liệu khi type thay đổi

    const fetchAllMovies = async () => {
      dispatch(setLoading(true));

      try {
        await Promise.all([
          fetchMovies(1, type),
          fetchMovies(2, type),
          fetchMovies(3, type),
        ]);
      } catch (error) {
        console.error('Lỗi khi tải phim:', error);
      } finally {
        if (isMounted) dispatch(setLoading(false));
      }
    };

    fetchAllMovies();

    return () => {
      isMounted = false;
    };
  }, [type]);

  return (
    <div>
      <Slider data={moviesData[1]} type={type}></Slider>
      <SliderStatic
        title={'Phim hay mỗi ngày'}
        data={moviesData[2]}
        type={type}
      ></SliderStatic>
      <SliderHover
        title="TOP 10 TRONG NGÀY"
        data={moviesData[3]}
        type={type}
      ></SliderHover>
    </div>
  );
}

export default Home;
