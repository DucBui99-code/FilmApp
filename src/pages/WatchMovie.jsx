import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Button, IconButton, Typography } from '@material-tailwind/react';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import SliderStatic from '../components/body/SliderStatic';
import getMoviesServices from '../services/getMovies';
import Error404 from '../assets/error-404.png';
import InformationMovie from '../components/watchMovie/InformationMovie';
import EpisodesMovie from '../components/watchMovie/EpisodesMovie';
import CommentMovie from '../components/watchMovie/CommentMovie';
import { useDispatch } from 'react-redux';
import { setLoading } from '../store/appStore';
import { useAlert } from '../components/Message/AlertContext';

function WatchMovie() {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [suggetMovie, setSuggetMovie] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(0);

  const { showAlert } = useAlert();

  useEffect(() => {
    // dispatch(setLoading(true));
    if (name) {
      getMoviesServices
        .getMovieBySlug({ slug: name })
        .then((res) => {
          setData(res.movie);
          setEpisodes(res.episodes);
        })
        .catch((err) => showAlert(err.message));
    }

    getMoviesServices
      .getList({ page: 2 })
      .then((res) => {
        setSuggetMovie(res);
        // dispatch(setLoading(false));
      })
      .catch((err) => showAlert(err.message));
  }, []);

  return data.status ? (
    <div>
      <div className="flex items-center justify-start gap-2 p-2">
        <IconButton onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="w-6 text-white"></ArrowLeftIcon>
        </IconButton>
        <Typography className="text-white font-bold uppercase">
          {data?.name +
            ' - Tập ' +
            episodes[0]?.server_data[currentEpisode]?.name}
        </Typography>
      </div>
      <div className="relative">
        <iframe
          src={episodes[0]?.server_data[currentEpisode].link_embed}
          width="100%"
          height="600"
          frameborder="0"
          allow="autoplay; fullscreen"
          title="Movie"
        ></iframe>
        <Typography className="absolute top-0 right-2" color="white" as={'h2'}>
          Helô
        </Typography>
      </div>
      <InformationMovie data={data}></InformationMovie>
      <EpisodesMovie
        data={data}
        currentEpisode={currentEpisode}
        setCurrentEpisode={setCurrentEpisode}
      ></EpisodesMovie>
      <CommentMovie></CommentMovie>
      <SliderStatic title="Phim đề xuất" data={suggetMovie}></SliderStatic>
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
