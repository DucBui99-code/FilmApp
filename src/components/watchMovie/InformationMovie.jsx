import React, { useState } from 'react';
import {
  ClipboardDocumentCheckIcon,
  ClockIcon,
  EyeIcon,
  HeartIcon,
  LanguageIcon,
  ShareIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/16/solid';
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
} from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { useCopyToClipboard } from 'usehooks-ts';
import DOMPurify from 'dompurify';

import { MOVIE_TYPE } from '../../config/constant';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useAlert } from '../Message/AlertContext';
import getErrorMessage from '../../utils/handelMessageError';
import UserServices from '../../services/userServices';

function InformationMovie({ data, type, isRent }) {
  const maxLengthContent = 300;
  const { isLogin } = useSelector((state) => state.auth);
  const { showAlert } = useAlert();
  const [value, copy] = useCopyToClipboard();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const clearContent = (text) => {
    const sanitizedText = DOMPurify.sanitize(text, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br'],
    });
    return sanitizedText.replace(/\n/g, '<br />');
  };

  const handelOpenShareFacebook = () => {
    const currentUrl = window.location.href; // Lấy link hiện tại
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`;

    // Mở tab mới với URL chia sẻ của Facebook
    window.open(facebookShareUrl, '_blank', 'noopener,noreferrer');
  };
  const handelLikeMovie = async () => {
    if (!isLogin) {
      return showAlert('Vui lòng đăng nhập', 'error');
    }
    try {
      const requestData = {
        movieId: data._id,
        action: 'add',
      };
      const res = await UserServices.toggleFavoriteMovie(requestData);
      showAlert(res.message, 'success');
    } catch (error) {
      showAlert(getErrorMessage(error), 'error');
    }
  };
  return (
    <div className="mt-4 p-3 flex flex-col items-center justify-between gap-5 lg:flex-row">
      <div className="self-center w-full lg:self-start lg:w-1/4">
        <img
          src={data.poster_url}
          srcSet={data.poster_url}
          loading="lazy"
          className="w-full h-96 object-cover rounded-sm"
          alt="Poster"
        ></img>
      </div>
      <div className="self-center w-full lg:self-start lg:w-2/4">
        <Typography className="text-white font-bold uppercase text-2xl">
          {data?.name}
        </Typography>
        <div className="flex items-center gap-4 mt-2">
          <Tooltip content="Thêm vào yêu thích">
            <IconButton onClick={handelLikeMovie}>
              <HeartIcon className="w-6 text-primary"></HeartIcon>
            </IconButton>
          </Tooltip>
          <Tooltip content="Chia sẻ Faceboook">
            <IconButton onClick={handelOpenShareFacebook}>
              <ShareIcon className="w-6 text-primary"></ShareIcon>
            </IconButton>
          </Tooltip>
          <Tooltip content="Sao chép link">
            <IconButton onClick={() => copy(window.location.href)}>
              <ClipboardDocumentCheckIcon className="w-6 text-primary"></ClipboardDocumentCheckIcon>
            </IconButton>
          </Tooltip>
        </div>
        <div className="flex items-center gap-4 mt-2 text-white">
          <div className="border-[1px] px-2 py-1 rounded-md text-white text-sm">
            {data.quality}
          </div>
          |
          <div className="bg-gray-800 rounded-lg px-2 py-1 text-primary font-bold">
            T13
          </div>
        </div>
        <div className="mt-4 text-white flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <EyeIcon className="w-6"></EyeIcon>
            <Typography as={'small'} className="font-bold">
              {data.view} Views
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="w-5"></ClockIcon>
            <Typography as={'small'} className="font-bold">
              {data.time}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <LanguageIcon className="w-5"></LanguageIcon>
            <Typography as={'small'} className="font-bold">
              {data.lang}
            </Typography>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-white font-bold">
            <motion.div
              initial={{ height: 'auto' }}
              animate={true}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: isExpanded
                  ? clearContent(data.content)
                  : clearContent(data.content).slice(0, maxLengthContent) +
                    '...',
              }}
            />
          </div>
          {data.content.length > maxLengthContent && (
            <Button
              variant="text"
              onClick={toggleExpand}
              className="mt-2 text-primary hover:opacity-85 transition p-0"
            >
              {isExpanded ? 'Thu gọn ▲' : 'Xem thêm ▼'}
            </Button>
          )}
          {type === MOVIE_TYPE.movieRent && !isRent && (
            <Link to={`/thanh-toan/${data?._id}`}>
              <Button className="flex items-center gap-3 bg-primary mt-3">
                <CurrencyDollarIcon className="w-4"></CurrencyDollarIcon>
                Thuê phim
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div className="self-center w-full lg:self-start lg:w-1/4 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Typography className="text-gray-700 font-bold">
            Đạo diễn:{' '}
          </Typography>
          <Typography className="text-white font-bold">
            {data?.director?.length && data?.director[0]
              ? data.director.join(',')
              : 'Đang cập nhật'}
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <Typography className="text-gray-700 font-bold">
            Diễn viên:{' '}
          </Typography>
          <Typography className="text-white font-bold">
            {data?.actor?.length && data?.actor[0]
              ? data.actor.join(', ')
              : 'Đang cập nhật'}
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <Typography className="text-gray-700 font-bold">Danh mục:</Typography>
          <Typography className="text-white font-bold first-letter:uppercase">
            {data?.type ? data.type : 'Đang cập nhật'}
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <Typography className="text-gray-700 font-bold">Quốc gia:</Typography>
          <Typography className="text-white font-bold">
            {data?.country?.length && data?.country[0]
              ? data.country.map((c) => c.name).join(', ')
              : 'Đang cập nhật'}
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <Typography className="text-gray-700 font-bold">Thể loại:</Typography>
          <Typography className="text-white font-bold">
            {data?.category && data?.category?.length > 0
              ? data.category.map((c) => c.name).join(', ')
              : 'Đang cập nhật'}
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <Typography className="text-gray-700 font-bold">
            Năm phát hành:
          </Typography>
          <Typography className="text-white font-bold">
            {data?.year ? data.year : 'Đang cập nhật'}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default InformationMovie;
