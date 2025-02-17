import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
  PlayCircleIcon,
} from '@heroicons/react/16/solid';
import React, { useRef, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router';

function SliderHover({ title = 'Test', data, type }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [hoveredIndex, setHoveredIndex] = useState(null);

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
    <div className="mt-3 p-3">
      <Typography as={'h1'} className="text-white text-2xl font-bold">
        {title}
      </Typography>
      <div className="cursor-grab relative">
        {data?.items?.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={5}
            slidesPerView={5}
            className="mt-3 relative z-0"
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
                <div
                  className="relative z-0"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img
                    src={data.pathImage + e.thumb_url}
                    alt={`Thumbnail`}
                    className="w-full h-[550px] transition-all object-cover cursor-pointer rounded-sm"
                  />

                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className={`absolute top-0 ${index === 0 ? 'left-2' : 'right-2'} w-96 h-full flex items-center justify-center shadow-lg`}
                    >
                      <Card className="max-w-[24rem] overflow-hidden">
                        <CardHeader
                          floated={false}
                          shadow={false}
                          color="transparent"
                          className="m-0 rounded-none"
                        >
                          <img
                            src={data.pathImage + e.poster_url}
                            alt="Poster"
                            className="w-full"
                          />
                        </CardHeader>
                        <CardBody className="bg-black">
                          <Typography variant="h4" color="white">
                            {e.origin_name}
                          </Typography>
                          <div className="flex items-center justify-start mt-2 gap-3">
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
                            |
                            <div className="font-bold text-white">{e.year}</div>
                          </div>
                          <div className="text-white py-1 text-sm font-bold mt-3">
                            <span>⭐ {e.tmdb.vote_average.toFixed(1)}</span> |{' '}
                            <span>{e.tmdb.vote_count} votes</span>
                          </div>
                        </CardBody>
                        <CardFooter className="flex items-center justify-between bg-black">
                          <Link
                            to={
                              type === 'movieRent'
                                ? `/phim/${e.slug}`
                                : `/watch/${e.slug}`
                            }
                          >
                            <Button
                              className="flex items-center gap-3 mt-6 text-base"
                              variant="outlined"
                              color="light-green"
                            >
                              <PlayCircleIcon className="w-6" />
                              Xem Ngay
                            </Button>
                          </Link>

                          <Button
                            className="flex items-center gap-3 mt-6 text-base"
                            color="light-blue"
                            variant="outlined"
                          >
                            <InformationCircleIcon className="w-6" />
                            Chi tiết
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  )}
                </div>
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

export default SliderHover;
