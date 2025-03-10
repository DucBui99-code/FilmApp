import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
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

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  const [data, setData] = useState({ items: [], pathImage: '' });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const observer = useRef();

  useEffect(() => {
    if (query) {
      setPage(1);
      setHasMore(true);
      setData({ items: [], pathImage: '' });
      fetchMovies(1);
    }
  }, [query]);

  const fetchMovies = async (pageNumber) => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const res = await movieServices.searchMovie(query, pageNumber);
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
      <Typography className="text-white font-semibold flex items-center mt-2 ml-4">
        Tìm kiếm:{' '}
        <Typography className="text-primary font-bold ml-2 text-xl">
          {query}
        </Typography>
      </Typography>
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
                <Link
                  to={
                    item?.__t === 'MovieRent'
                      ? `/xem-phim-goi/${item.slug}`
                      : `/xem-phim-mien-phi/${item.slug}`
                  }
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img
                    src={data.pathImage + item.poster_url}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-auto rounded-lg object-cover"
                    style={{ height: '300px' }}
                  />
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 w-96 h-full flex items-center justify-center shadow-lg"
                    >
                      <Card className="max-w-[24rem] overflow-hidden">
                        <CardHeader
                          floated={false}
                          shadow={false}
                          color="transparent"
                        >
                          <img
                            src={data.pathImage + item.poster_url}
                            alt="Poster"
                            className="w-full"
                            loading="lazy"
                          />
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
                        </CardBody>
                        <CardFooter className="flex items-center justify-between bg-black">
                          <Link
                            to={
                              item?.__t === 'MovieRent'
                                ? `/xem-phim-goi/${item.slug}`
                                : `/xem-phim-mien-phi/${item.slug}`
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
                </Link>
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
          <p className="text-center col-span-full">Đang tải thêm...</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
