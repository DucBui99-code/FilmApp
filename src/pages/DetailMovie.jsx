import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import movieServices from '../services/movieServices';
import { useAlert } from '../components/Message/AlertContext';
import { useSelector } from 'react-redux';
import emitter from '../utils/eventBus';
import { HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { CurrencyDollarIcon } from '@heroicons/react/16/solid';
import { Tooltip } from '@material-tailwind/react';
import CommentMovie from '../components/watchMovie/CommentMovie';
import Slider from '../components/body/Slider';
import SliderStatic from '../components/body/SliderStatic';

const RowInfoMovie = ({ label, content, handleClickActor }) => {
  const [actors, setActors] = useState([]);
  useEffect(() => {
    if (content) {
      setActors(
        content
          .toString()
          .split(',')
          .map((actor) => actor.trim())
      );
    }
  }, [content]);
  return (
    <div className="text-white font-bold flex w-full text-[18px] mb-[20px]">
      <div className="w-2/5 text-[#9b9b9b]">{label}</div>
      <div className="w-3/5">
        {actors?.map((actor, index) => (
          <span
            key={index}
            className={`${
              handleClickActor ? 'cursor-pointer hover:text-primary' : ''
            }`}
            onClick={
              handleClickActor ? () => handleClickActor(actor) : undefined
            }
          >
            {actor}
            {index < actors.length - 1 && ', '}
          </span>
        ))}
      </div>
    </div>
  );
};

const ContentMovie = ({ data }) => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const handleClickActor = (actor) => {
    console.log('actor: ', actor);
  };

  const getType = (type) => {
    switch (type) {
      case 'series':
        return 'Phim dài tập';
      default:
        return type;
    }
  };

  const handleRentMovie = async (movieId) => {
    navigate('/thanh-toan?id=' + movieId);
  };

  return (
    <div className="xl:grid grid-cols-4 xl:mx-[80px] mx-[20px] mt-[40px]">
      <div className="col-span-3 grid grid-cols-4 gap-6">
        <div className="col-span-1 xl:block hidden">
          <img src={data?.thumb_url} alt="Poster" />
        </div>
        <div className="col-span-3 text-white font-bold flex flex-col items-baseline justify-start">
          <h1 className="uppercase text-[36px] leading-[36px]">{data?.name}</h1>
          <img
            src={data?.thumb_url}
            alt="Poster"
            className="w-1/2 block xl:hidden mt-[20px]"
          />
          <div className="flex justify-start items-center text-primary my-6 px-2">
            <Tooltip
              content="Thêm vào yêu thích"
              className="bg-[#5a5a5a] text-[12px] font-bold"
            >
              <HeartIcon className="w-[24px] mr-3 cursor-pointer" />
            </Tooltip>
            <Tooltip
              content="Chia sẻ"
              className="bg-[#5a5a5a] text-[12px] font-bold"
            >
              <ShareIcon className="w-[24px] cursor-pointer" />
            </Tooltip>
          </div>
          <div className="flex items-center mb-5">
            <button className="border border-whiteText bg-black px-[6px] rounded-md cursor-default">
              {data?.quality}
            </button>
            <div className="h-[12px] w-[1px] bg-[#2f2f2f] mx-[8px]"></div>
            <button className="bg-[#383838] text-primary px-[6px] rounded-md border border-[#383838] cursor-default">
              T13
            </button>
          </div>
          <p className="text-base mb-4 line-clamp-4">{data?.content}</p>
          <button
            className="bg-primary flex justify-center items-center px-[40px] py-[8px] text-[16px] rounded-md hover:opacity-80"
            onClick={() => handleRentMovie(data?.movieId)}
          >
            <CurrencyDollarIcon className="w-[20px] mr-[6px]" />
            Thuê phim
          </button>
        </div>
      </div>
      <div className="grid-cols-1 xl:mt-0 mt-4">
        <RowInfoMovie label="Đạo diễn:" content={data?.director.join(', ')} />
        <RowInfoMovie
          label="Diễn viên:"
          content={data?.actor.join(', ')}
          handleClickActor={handleClickActor}
        />
        <RowInfoMovie label="Danh mục:" content={getType(data?.type)} />
        <RowInfoMovie
          label="Thể loại:"
          content={data?.category.map((item) => item.name).join(', ')}
        />
        <RowInfoMovie
          label="Quốc gia:"
          content={data?.country.map((item) => item.name).join(', ')}
        />
        <RowInfoMovie label="Năm phát hành:" content={data?.year} />
      </div>
    </div>
  );
};

const RecommendedMovies = ({ className }) => {
  const [listFilm, setListFilm] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await movieServices.getListMovie({
          page: 1,
          type: 'movieRent',
        });
        setListFilm(res);
      } catch (error) {
        console.log('error: ', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={className}>
      <SliderStatic
        title={'Phim đề xuất'}
        data={listFilm}
        type="movieRent"
      ></SliderStatic>
    </div>
  );
};

function DetailMovie({ className }) {
  const { slug } = useParams();
  const { showAlert } = useAlert();
  const userData = useSelector((s) => s.auth);
  const [movieData, setMovieData] = useState();
  useEffect(() => {
    const getMove = async () => {
      try {
        const res = await movieServices.getMovieBySlug(slug);
        setMovieData(res.data);
      } catch (error) {
        showAlert('Error fetching movie:', 'error');
      }
    };
    getMove();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!userData.userInfo) {
      showAlert('Vui lòng đăng nhập để xem phim gói', 'error');
      emitter.emit('openLogin');
    }
  }, []);

  return (
    <div>
      <ContentMovie data={movieData} />
      <RecommendedMovies />
      <div className="xl:mx-[80px] mx-[20px]">
        <CommentMovie />
      </div>
    </div>
  );
}

export default DetailMovie;
