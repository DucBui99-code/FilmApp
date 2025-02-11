import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Button, IconButton, Typography } from '@material-tailwind/react';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import SliderStatic from '../components/body/SliderStatic';
import MoviesServices from '../services/movieServices';
import Error404 from '../assets/error-404.png';
import InformationMovie from '../components/watchMovie/InformationMovie';
import EpisodesMovie from '../components/watchMovie/EpisodesMovie';
import CommentMovie from '../components/watchMovie/CommentMovie';
import { useAlert } from '../components/Message/AlertContext';

function WatchMovie() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    movieId: null,
    status: null,
    data: null,
    suggestMovies: [],
    episode: {},
  });

  const [currentEpisode, setCurrentEpisode] = useState(0);
  const { showAlert } = useAlert();

  useEffect(() => {
    let isMounted = true;

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
      } catch (err) {
        showAlert(err.message);
    const timeout = setTimeout(() => {
      if (name) {
        MoviesServices.getMovieBySlug(name)
          .then((res) => {
            setStatus(res.status);
            setData(res.movie);
            setEpisodes(res.episodes);
          })
          .catch((err) => showAlert(err.message,'error'));
      }
    };

    const timeout = setTimeout(fetchData, 3000);
      MoviesServices.getListMovie({ page: 2 })
        .then((res) => {
          setSuggetMovie(res);
        })
        .catch((err) => showAlert(err.message,'error'));
    }, 3000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
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
        }));
      })
      .catch((err) => showAlert(err.message));
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
    <div>
      <div className="flex items-center justify-start gap-2 p-2">
        <IconButton onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="w-6 text-white"></ArrowLeftIcon>
        </IconButton>
        <Typography className="text-white font-bold uppercase">
          {state.data?.name + ' - Tập ' + state.episode?.name}
        </Typography>
      </div>
      <div className="relative">
        <iframe
          src={state.episode?.link_embed}
          width="100%"
          height="600"
          frameborder="0"
          allow="autoplay; fullscreen"
          title="Movie"
        ></iframe>
      </div>
      <InformationMovie data={state.data}></InformationMovie>

      <EpisodesMovie
        data={state.data}
        currentEpisode={currentEpisode}
        setCurrentEpisode={setCurrentEpisode}
      ></EpisodesMovie>

      <CommentMovie></CommentMovie>
      <SliderStatic
        title="Phim đề xuất"
        data={state.suggestMovies}
      ></SliderStatic>
    </div>
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
