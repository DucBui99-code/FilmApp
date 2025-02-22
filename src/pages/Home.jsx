import React, { useEffect, useState } from 'react';
import Slider from '../components/body/Slider';
import SliderStatic from '../components/body/SliderStatic';
import MoviesServices from '../services/movieServices';
import SliderHover from '../components/body/SliderHover';
import { useAlert } from '../components/Message/AlertContext';
import { useDispatch } from 'react-redux';
import { setLoading } from '../store/appStore';

function Home({ type }) {
  const [moviesData, setMoviesData] = useState({}); // Lưu trữ kết quả theo từng trang
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const fetchMovies = async (page) => {
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
      showAlert(error.response?.data?.message, 'error');
    }
  };

  useEffect(() => {
    let isMounted = true; // Cờ kiểm tra component còn mounted

    const fetchAllMovies = async () => {
      dispatch(setLoading(true));

      try {
        await Promise.all([fetchMovies(1), fetchMovies(2), fetchMovies(3)]);
      } catch (error) {
        console.error('Lỗi khi tải phim:', error);
      } finally {
        if (isMounted) dispatch(setLoading(false)); // Chỉ update state nếu component chưa unmount
      }
    };

    fetchAllMovies(); // Gọi hàm async

    return () => {
      isMounted = false; // Cleanup tránh lỗi khi unmount
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
