import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Slider from '../components/Body/Slider';
import SliderStatic from '../components/Body/SliderStatic';
import SliderHover from '../components/Body/SliderHover';
import MoviesServices from '../services/movieServices';
import { useAlert } from '../components/Message/AlertContext';
import { setLoading } from '../store/appStore';
import getErrorMessage from '../utils/handelMessageError';
import CareSlider from '../components/Body/CareSlider';

const Home = ({ type }) => {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const [moviesData, setMoviesData] = useState({});
  const observers = useRef({});

  const fetchMovies = async (page) => {
    try {
      dispatch(setLoading(true));
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
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    setMoviesData({}); // Reset dữ liệu khi type thay đổi
    Object.values(observers.current).forEach((observer) =>
      observer.disconnect()
    );
    observers.current = {};
  }, [type]);

  const observeElement = (element, page) => {
    if (!element || observers.current[page]) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMovies(page);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    observers.current[page] = observer;
  };

  return (
    <div>
      <div ref={(el) => observeElement(el, 1)}>
        <Slider data={moviesData[1]} type={type} />
      </div>
      <CareSlider></CareSlider>
      <div ref={(el) => observeElement(el, 2)}>
        <SliderStatic
          title={'Phim hay mỗi ngày'}
          data={moviesData[2]}
          type={type}
        />
      </div>
      <div ref={(el) => observeElement(el, 3)}>
        <SliderHover
          title="TOP 10 TRONG NGÀY"
          data={moviesData[3]}
          type={type}
        />
      </div>
      <div ref={(el) => observeElement(el, 4)}>
        <SliderHover
          title="Phim Hot Nhất Hôm Nay"
          data={moviesData[4]}
          type={type}
        />
      </div>
      <div ref={(el) => observeElement(el, 5)}>
        <SliderHover
          title="Xu Hướng Xem Nhiều Nhất"
          data={moviesData[5]}
          type={type}
        />
      </div>
      <div ref={(el) => observeElement(el, 6)}>
        <SliderHover
          title="Siêu Phẩm Đáng Xem Nhất"
          data={moviesData[6]}
          type={type}
        />
      </div>
    </div>
  );
};

export default Home;
