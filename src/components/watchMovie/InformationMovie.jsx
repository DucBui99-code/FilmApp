import {
  ClipboardDocumentCheckIcon,
  ClockIcon,
  EyeIcon,
  HeartIcon,
  LanguageIcon,
  ShareIcon,
} from '@heroicons/react/16/solid';
import { IconButton, Tooltip, Typography } from '@material-tailwind/react';
import React from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import DOMPurify from 'dompurify';

function InformationMovie({ data }) {
  const [value, copy] = useCopyToClipboard();

  const clearContent = (text) => {
    return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
  };

  const handelOpenShareFacebook = () => {
    const currentUrl = window.location.href; // Lấy link hiện tại
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`;

    // Mở tab mới với URL chia sẻ của Facebook
    window.open(facebookShareUrl, '_blank', 'noopener,noreferrer');
  };
  return (
    <div className="mt-4 p-3 flex flex-col items-center justify-between gap-5 lg:flex-row">
      <div className="self-center w-full lg:self-start lg:w-1/4">
        <img
          src={data.poster_url}
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
            <IconButton>
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
          <Typography className="text-white font-bold">
            {clearContent(data.content)}
          </Typography>
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
              : 'Not Found Information'}
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <Typography className="text-gray-700 font-bold">
            Diễn viên:{' '}
          </Typography>
          <Typography className="text-white font-bold">
            {data?.actor?.length && data?.actor[0]
              ? data.actor.join(', ')
              : 'Not Found Information'}
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <Typography className="text-gray-700 font-bold">Danh mục:</Typography>
          <Typography className="text-white font-bold first-letter:uppercase">
            {data?.type ? data.type : 'Not Found Information'}
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <Typography className="text-gray-700 font-bold">Quốc gia:</Typography>
          <Typography className="text-white font-bold">
            {data?.country?.length && data?.country[0]
              ? data.country.map((c) => c.name).join(', ')
              : 'Not Found Information'}
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <Typography className="text-gray-700 font-bold">Thể loại:</Typography>
          <Typography className="text-white font-bold">
            {data?.category && data?.category?.length > 0
              ? data.category.map((c) => c.name).join(', ')
              : 'Not Found Information'}
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <Typography className="text-gray-700 font-bold">
            Năm phát hành:
          </Typography>
          <Typography className="text-white font-bold">
            {data?.year ? data.year : 'Not Found Information'}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default InformationMovie;
