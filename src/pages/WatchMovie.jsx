import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { IconButton, Typography } from '@material-tailwind/react';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

import MoviesServices from '../services/movieServices';
import InformationMovie from '../components/WatchMovie/InformationMovie';
import EpisodesMovie from '../components/WatchMovie/EpisodesMovie';
import CommentMovie from '../components/WatchMovie/CommentMovie';
import { useAlert } from '../components/Message/AlertContext';
import SliderStatic from '../components/Body/SliderStatic';
import Error404 from '../assets/error-404.png';
import getErrorMessage from '../utils/handelMessageError';
import VideoPlayer from '../components/WatchMovie/VideoPlayer';
import BlockLiveComment from '../components/WatchMovie/BlockLiveComment';

function WatchMovie({ movieType }) {
  const { name } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    movieId: null,
    status: null,
    data: null,
    suggestMovies: [],
    episode: {},
    isRent: false,
  });

  const [currentEpisode, setCurrentEpisode] = useState(0);
  const { showAlert } = useAlert();

  useEffect(() => {
    let isMounted = true;
    let timeout;

    if (!name) return;

    const fetchData = async () => {
      try {
        const [movieRes, listRes] = await Promise.all([
          MoviesServices.getMovieBySlug(name),
          MoviesServices.getListMovie({ page: 0 }),
        ]);

        if (isMounted) {
          setState((prevState) => ({
            ...prevState,
            movieId: movieRes.data._id,
            status: movieRes.status,
            data: movieRes.data,
            suggestMovies: listRes,
          }));
        }
      } catch (error) {
        showAlert(getErrorMessage(error), 'error');
        timeout = setTimeout(() => {
          if (name) {
            MoviesServices.getMovieBySlug(name)
              .then((res) => {
                if (isMounted) {
                  setState((prevState) => ({
                    ...prevState,
                    status: res.status,
                    data: res.movie,
                    episodes: res.episodes,
                  }));
                }
              })
              .catch((error) => {
                showAlert(getErrorMessage(error), 'error');
              });
          }
        }, 3000); // Thêm thời gian chờ (3 giây) để tránh spam request
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      if (timeout) clearTimeout(timeout);
    };
  }, [name]);

  useEffect(() => {
    if (!state.movieId) return;

    MoviesServices.getSingleEpisode({
      movieId: state.movieId,
      indexEpisode: currentEpisode,
    })
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          episode: res.data,
          isRent: true,
        }));
      })
      .catch((err) => {
        showAlert(err.response.data.message, 'error');
        setState((prevState) => ({
          ...prevState,
          isRent: false,
        }));
      });
  }, [currentEpisode, state.movieId]);

  if (!state.data) {
    return (
      <div className="flex animate-pulse flex-col">
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
      </div>
    );
  }

  return state.status ? (
    <>
      {state.isRent && (
        <div className="flex items-center justify-start gap-2 p-2">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="w-6 text-white"></ArrowLeftIcon>
          </IconButton>
          <Typography className="text-white font-bold uppercase">
            {state.data?.name + ' - Tập ' + state.episode?.name}
          </Typography>
        </div>
      )}
      {state.isRent && (
        <>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-5 p-4 lg:p-12">
            <div className="flex-1 w-full lg:w-auto">
              <VideoPlayer
                linkEmbed={state.episode?.link_embed}
                thumbnail={state.data?.poster_url}
              />
            </div>
            {state.data.isLiveComment && (
              <div className="w-full lg:w-1/3 self-start">
                <BlockLiveComment movieId={state.movieId}></BlockLiveComment>
              </div>
            )}
          </div>
        </>
      )}
      <div className="p-4 md:p-12">
        <InformationMovie
          data={state.data}
          type={movieType}
          isRent={state.isRent}
        ></InformationMovie>

        {state.isRent && (
          <EpisodesMovie
            data={state.data}
            currentEpisode={currentEpisode}
            setCurrentEpisode={setCurrentEpisode}
          ></EpisodesMovie>
        )}

        <CommentMovie data={state}></CommentMovie>
        <SliderStatic
          title="Phim đề xuất"
          data={state.suggestMovies}
        ></SliderStatic>
      </div>
    </>
  ) : (
    <div className="flex items-center justify-center flex-col gap-3 h-96 w-full">
      <img src={Error404} className="w-40 object-cover"></img>
      <Typography className="text-white font-semibold text-xl">
        Not Found This Movie
      </Typography>
      <Link to="/">
        <Button className="bg-primary">Về trang chủ</Button>
      </Link>
    </div>
  );
}

export default WatchMovie;
