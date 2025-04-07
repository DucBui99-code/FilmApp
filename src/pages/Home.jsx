import React, { useEffect, useState, useRef } from 'react';
import { throttle } from 'lodash';
import Slider from '../components/Body/Slider';
import SliderStatic from '../components/Body/SliderStatic';
import SliderHover from '../components/Body/SliderHover';
import MoviesServices from '../services/movieServices';
import { useAlert } from '../components/Message/AlertContext';
import getErrorMessage from '../utils/handelMessageError';
import CareSlider from '../components/Body/CareSlider';

const Home = ({ type }) => {
  const { showAlert } = useAlert();
  const [moviesData, setMoviesData] = useState({});
  const observers = useRef({});

  const fetchMovies = throttle(async (page) => {
    try {
      if (moviesData[page]) return;

      const res = await MoviesServices.getListMovie({
        page,
        type,
      });

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
  }, 200);

  useEffect(() => {
    setMoviesData({});
    Object.values(observers.current).forEach((observer) =>
      observer.disconnect()
    );
    observers.current = {};

    // Load first page immediately
    fetchMovies(1);
  }, [type]);

  const observeElement = (element, page) => {
    if (!element || observers.current[page] || moviesData[page]) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMovies(page);
          observer.disconnect();
          delete observers.current[page];
        }
      },
      {
        rootMargin: '200px 0px',
        threshold: 0.01,
      }
    );

    observer.observe(element);
    observers.current[page] = observer;
  };

  return (
    <div className="home-container">
      <div ref={(el) => observeElement(el, 1)}>
        <Slider data={moviesData[1]} type={type} />
      </div>

      <CareSlider />

      {[2, 3, 4, 5, 6].map((page) => (
        <div key={page} ref={(el) => observeElement(el, page)}>
          {page === 2 ? (
            <SliderStatic
              title={'Phim hay mỗi ngày'}
              data={moviesData[page]}
              type={type}
            />
          ) : (
            <SliderHover
              title={getSliderTitle(page)}
              data={moviesData[page]}
              type={type}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const getSliderTitle = (page) => {
  const titles = {
    3: 'TOP 10 TRONG NGÀY',
    4: 'Phim Hot Nhất Hôm Nay',
    5: 'Xu Hướng Xem Nhiều Nhất',
    6: 'Siêu Phẩm Đáng Xem Nhất',
  };
  return titles[page] || 'Phim đề xuất';
};

export default Home;
