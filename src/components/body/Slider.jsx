// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  Controller,
  A11y,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useState, useRef } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayCircleIcon,
  SignalIcon,
} from '@heroicons/react/16/solid';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router';

const Slider = ({ data, type }) => {
  const topSwiperRef = useRef(null);
  const bottomSwiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const handleClickSlider = () => {
    console.log('data', data);
  };
  if (!data) {
    return (
      <div className="flex animate-pulse flex-col" onClick={handleClickSlider}>
        <div className="h-[550px] w-full  place-items-center rounded-lg bg-gray-300 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-12 w-12 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center gap-2 mt-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-full h-32 flex items-center justify-center rounded-lg bg-gray-300"
            >
              <PlayCircleIcon className="w-8 text-gray-500" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Swiper
        modules={[Autoplay, Controller]}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex);
          bottomSwiperRef.current?.slideTo(swiper.realIndex);
        }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        loop={true}
        onSwiper={(swiper) => (topSwiperRef.current = swiper)}
        className="z-10"
      >
        {data?.items.map((e, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              {e.isLiveComment && (
                <div className="absolute top-1 right-1 pr-3 pl-3 text-white rounded-md bg-red-400 flex items-center gap-2 justify-center">
                  Live
                  <SignalIcon className="w-6 text-whites"></SignalIcon>
                </div>
              )}
              <img
                src={data.pathImage + e.poster_url}
                srcSet={data.pathImage + e.poster_url}
                alt={`Slide ${index}`}
                loading="lazy"
                className="w-full h-[550px] object-cover cursor-grab"
              />

              {/* Lớp phủ gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
              <div className="absolute top-1/3 left-2">
                <Typography
                  as={'h2'}
                  className="text-white uppercase font-bold text-5xl"
                >
                  {e.origin_name}
                </Typography>
                <div className="flex items-center justify-start mt-2 gap-3 text-white">
                  <div className="border-[1px] px-2 py-1 rounded-md text-white text-sm">
                    HD
                  </div>
                  |
                  <div className="border-[1px] px-2 py-1 rounded-md text-white text-sm uppercase">
                    {e.tmdb.type}
                  </div>
                  |
                  <div className="bg-gray-700 rounded-lg px-2 py-1 text-primary font-bold">
                    T13
                  </div>
                  |<div className="font-bold text-white">{e.year}</div>
                </div>
                <div className="text-white py-1 text-sm font-bold mt-3">
                  <span>⭐ {e.tmdb.vote_average.toFixed(1)}</span> |{' '}
                  <span>{e.tmdb.vote_count} votes</span>
                </div>
                <Link
                  to={
                    type === 'movieRent'
                      ? `/xem-phim-goi/${e.slug}`
                      : `/xem-phim-mien-phi/${e.slug}`
                  }
                >
                  <Button className="flex items-center gap-3 bg-primary mt-6 text-lg">
                    <PlayCircleIcon className="w-6"></PlayCircleIcon>
                    Xem Ngay
                  </Button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="relative cursor-grab">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Controller, A11y]}
          spaceBetween={5}
          slidesPerView={6}
          className="mt-3"
          onSwiper={(swiper) => (bottomSwiperRef.current = swiper)}
          onClick={(swiper) => {
            const clickedIndex = swiper.clickedIndex;

            if (clickedIndex !== undefined && clickedIndex !== null) {
              setCurrentSlide(clickedIndex);
              topSwiperRef.current?.slideToLoop(clickedIndex); // Sử dụng slideToLoop để đồng bộ đúng trong chế độ loop
            }
          }}
          onBeforeInit={(swiper) => {
            // Gán refs sau khi Swiper khởi tạo
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 6,
            },
          }}
        >
          {data?.items.map((e, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <img
                  src={data.pathImage + e.poster_url}
                  alt={`Thumbnail ${index}`}
                  className={`w-full h-32 transition-all object-cover cursor-pointer rounded-sm ${
                    index === currentSlide && 'border-2 border-primary'
                  }`}
                />
                {e.isLiveComment && (
                  <div className="absolute top-1 right-1 pr-3 pl-3 text-white rounded-md bg-red-400 flex items-center gap-2 justify-center">
                    Live
                    <SignalIcon className="w-6 text-whites"></SignalIcon>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
          <button
            ref={prevRef}
            className="absolute top-1/2 z-10 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            ref={nextRef}
            className="absolute top-1/2  z-10 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
