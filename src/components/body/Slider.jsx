// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  Controller,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useState, useRef, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayCircleIcon,
} from "@heroicons/react/16/solid";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import getMoviesHeaderServices from "../../services/getMovies";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router";
import LoadingOverlay from "../Loading/LoadingOverlay";
import { useAlert } from "../Message/AlertContext";

const Slider = () => {
  const topSwiperRef = useRef(null);
  const bottomSwiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [pathUrl, setPathUrl] = useState(""); // Sử dụng state để quản lý PathUrl
  const [currentSlide, setCurrentSlide] = useState(0);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { showAlert } = useAlert();

  useEffect(() => {
    getMoviesHeaderServices
      .getList({ page: 0 })
      .then((res) => {
        setPathUrl(res.pathImage);
        setData(res.items);
        setIsLoaded(true);
      })
      .catch((err) => showAlert(err.message));
  }, []);

  if (!pathUrl || !data.length || !isLoaded) {
    return (
      <div>
        loading..
      </div>
    ); // Hiển thị "Loading..." khi dữ liệu chưa sẵn sàng
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
        {data.map((e, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                src={pathUrl + e.poster_url}
                alt={`Slide ${index}`}
                className="w-full h-[550px] object-cover cursor-grab"
              />
              {/* Lớp phủ gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>

              <div className="absolute top-1/3 left-2">
                <Typography
                  as={"h2"}
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
                  <span>⭐ {e.tmdb.vote_average.toFixed(1)}</span> |{" "}
                  <span>{e.tmdb.vote_count} votes</span>
                </div>
                <Link to={`/watch/${e.slug}`}>
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
          {data.map((e, index) => (
            <SwiperSlide key={index}>
              <img
                src={pathUrl + e.poster_url}
                alt={`Thumbnail ${index}`}
                className={`w-full h-32 transition-all object-cover cursor-pointer rounded-sm ${
                  index === currentSlide && "border-2 border-primary"
                }`}
              />
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
