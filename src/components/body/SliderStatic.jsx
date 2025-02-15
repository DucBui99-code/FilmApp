import { Typography } from '@material-tailwind/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayCircleIcon,
} from '@heroicons/react/16/solid';
import React, { useRef } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function SliderStatic({ title = 'Test', data }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!data) {
    return (
      <div className="flex items-center justify-center gap-2 mt-3 animate-pulse p-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="w-full h-[550px] flex items-center justify-center rounded-lg bg-gray-300"
          >
            <PlayCircleIcon className="w-8 text-gray-500" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="mt-3 p-3 ">
      <Typography as={'h1'} className="text-white text-2xl font-bold">
        {title}
      </Typography>
      <div className="cursor-grab relative">
        {data?.items?.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={5}
            slidesPerView={5}
            className="mt-3 overflow-hidden"
            onBeforeInit={(swiper) => {
              if (prevRef.current && nextRef.current) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
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
                slidesPerView: 5,
              },
            }}
          >
            {data.items.map((e, index) => (
              <SwiperSlide key={index}>
                <Link to={`/watch/${e.slug}`}>
                  <div className="relative group">
                    <img
                      src={data.pathImage + e.thumb_url}
                      alt={`Thumbnail ${index}`}
                      className={`w-full h-[550px] transition-all object-cover cursor-pointer rounded-sm group-hover:bg-black`}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircleIcon className="text-primary w-20"></PlayCircleIcon>
                    </div>
                  </div>
                  <Typography as={'small'} className="text-white font-bold">
                    {e.origin_name}
                  </Typography>
                </Link>
              </SwiperSlide>
            ))}
            <button
              ref={prevRef}
              className={`absolute top-1/2 z-10 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer ${
                data.items.length < 2 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={data.items.length < 2}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              ref={nextRef}
              className={`absolute top-1/2 z-10 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer ${
                data.items.length < 2 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={data.items.length < 2}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </Swiper>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-black/50 opacity-60 transition-opacity pointer-events-none rounded-sm z-10"></div>
      </div>
    </div>
  );
}

export default SliderStatic;
