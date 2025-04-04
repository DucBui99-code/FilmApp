import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import { motion } from 'framer-motion';
import {
  InformationCircleIcon,
  PlayCircleIcon,
} from '@heroicons/react/16/solid';

import movieServices from '../services/movieServices';
import Empty from '../assets/man.png';
import LazyImage from '../components/LazyImage';

const ResultMovie = ({ type }) => {
  const { country, category } = useParams();

  const [data, setData] = useState({ items: [], pathImage: '' });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const observer = useRef();

  useEffect(() => {
    if (!type) return;

    // Reset state
    setPage(1);
    setHasMore(true);
    setData({ items: [], pathImage: '' });

    // Gọi API với tham số phù hợp
    fetchMovies(1);
  }, [type, country, category]); // Theo dõi cả 3 giá trị

  const fetchMovies = async (pageNumber) => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      let res;
      if (type == 'category') {
        res = await movieServices.getMovieByCategory({
          page: pageNumber,
          category: category,
        });
      } else if (type === 'country') {
        res = await movieServices.getMovieByCountry({
          page: pageNumber,
          country: country,
        });
      } else if (type === 'single' || type === 'series') {
        res = await movieServices.getMovieByType({
          page: pageNumber,
          type: type,
        });
      } else {
        return;
      }

      setData((prev) => ({
        items:
          pageNumber === 1
            ? res.data.items
            : [...prev.items, ...res.data.items],
        pathImage: res.data.pathImage,
      }));

      setHasMore(!res.data.pagination.lastPage);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm phim:', error);
    }
    setLoading(false);
  };

  const lastMovieRef = useCallback(
    (node) => {
      if (!hasMore || loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );

  useEffect(() => {
    if (page > 1) {
      fetchMovies(page);
    }
  }, [page]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 min-h-screen">
        {data?.items?.length > 0 ? (
          data.items.map((item, index) => {
            const isLastItem = index === data.items.length - 1;
            return (
              <div
                key={item._id}
                className="relative"
                ref={isLastItem ? lastMovieRef : null}
              >
                <div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <LazyImage
                    src={item.poster_url}
                    alt={`Thumbnail ${index}`}
                    className="w-full h-auto transition-all object-cover cursor-pointer rounded-sm"
                  ></LazyImage>

                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="absolute -top-10 w-96 flex items-center justify-center shadow-xl z-[99999]"
                    >
                      <Card className="overflow-hidden">
                        <CardHeader
                          floated={false}
                          shadow={false}
                          className="m-0 rounded-none"
                        >
                          <LazyImage
                            src={item.poster_url}
                            alt={`Posster ${index}`}
                            className="w-full"
                          ></LazyImage>
                        </CardHeader>
                        <CardBody className="bg-black">
                          <Typography variant="h4" color="white">
                            {item.origin_name}
                          </Typography>
                          <div className="flex items-center justify-start mt-2 gap-3">
                            <div className="border-[1px] px-2 py-1 rounded-md text-white text-sm">
                              HD
                            </div>{' '}
                            |
                            <div className="border-[1px] px-2 py-1 rounded-md text-white text-sm uppercase">
                              {item.tmdb.type}
                            </div>{' '}
                            |
                            <div className="bg-gray-700 rounded-lg px-2 py-1 text-primary font-bold">
                              T13
                            </div>{' '}
                            |
                            <div className="font-bold text-white">
                              {item.year}
                            </div>
                          </div>
                          <div className="text-white py-1 text-sm font-bold mt-3">
                            <span>⭐ {item.tmdb.vote_average.toFixed(1)}</span>{' '}
                            | <span>{item.tmdb.vote_count} votes</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <Link
                              to={
                                item?.__t === 'DetailMovieRent'
                                  ? `/xem-phim-goi/${item.slug}`
                                  : `/xem-phim-mien-phi/${item.slug}`
                              }
                            >
                              <Button
                                className="flex items-center gap-3 text-base"
                                variant="outlined"
                                color="light-green"
                              >
                                <PlayCircleIcon className="w-6" />
                                Xem Ngay
                              </Button>
                            </Link>

                            <Button
                              className="flex items-center gap-3 text-base"
                              color="light-blue"
                              variant="outlined"
                            >
                              <InformationCircleIcon className="w-6" />
                              Chi tiết
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-white text-2xl text-center w-full col-span-full flex items-center justify-center flex-col">
            Không tìm thấy phim phù hợp
            <img src={Empty} className="w-56 object-cover mt-2"></img>
          </p>
        )}
        {loading && (
          <p className="text-center col-span-full" onClick={() => {}}>
            Đang tải thêm...
          </p>
        )}
      </div>
    </div>
  );
};

export default ResultMovie;
