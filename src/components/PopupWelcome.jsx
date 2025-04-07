import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import {
  EyeIcon,
  PlayCircleIcon,
  SignalIcon,
  XMarkIcon,
} from '@heroicons/react/16/solid';
import LazyImage from './LazyImage';
import movieServices from '../services/movieServices';

const PopupWelcome = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      setShowPopup(true);
      sessionStorage.setItem('hasSeenPopup', 'true');
    }
  }, []);

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        setLoading(true);
        const res = await movieServices.getRandomMovieLive();
        if (res) {
          setMovie(res.data);
        } else {
          setError('Không thể tải thông tin phim');
        }
      } catch (error) {
        console.error('Error fetching random movie:', error);
        setError('Đã xảy ra lỗi khi tải phim');
      } finally {
        setLoading(false);
      }
    };

    if (showPopup) fetchRandomMovie();
  }, [showPopup]);

  const handleClose = () => setShowPopup(false);

  // Không hiển thị gì nếu popup không được hiển thị
  if (!showPopup) return null;

  // Hiển thị loading khi đang tải dữ liệu
  if (loading) {
    return (
      <Dialog open={showPopup} onClose={handleClose} className="bg-black">
        <DialogHeader className="text-white">Đang tải phim...</DialogHeader>
        <DialogBody>
          <div className="text-white">Vui lòng chờ trong giây lát...</div>
        </DialogBody>
      </Dialog>
    );
  }

  // Hiển thị thông báo lỗi nếu có
  if (error || !movie) {
    return (
      <Dialog open={showPopup} onClose={handleClose} className="bg-black">
        <DialogHeader className="text-white">Đã xảy ra lỗi</DialogHeader>
        <DialogBody>
          <div className="text-white">
            {error || 'Không thể tải thông tin phim'}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            Đóng
          </Button>
        </DialogFooter>
      </Dialog>
    );
  }

  const viewCount = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
  const movieLink =
    movie?.__t === 'DetailMovieRent'
      ? `/xem-phim-goi/${movie.slug}`
      : `/xem-phim-mien-phi/${movie.slug}`;

  return (
    <Dialog
      open={showPopup}
      onClose={handleClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="bg-black"
    >
      <DialogHeader className="text-white relative">
        {movie.name}
        <XMarkIcon
          className="absolute top-1 right-1 w-6 h-6 text-white cursor-pointer"
          onClick={handleClose}
        />
      </DialogHeader>

      <DialogBody>
        <div className="relative">
          <LazyImage
            src={movie.thumb_url}
            alt={movie.name}
            className="w-full h-96 object-cover rounded-md mb-4"
          />
          <div className="absolute top-1 left-1 px-3 text-white rounded-md bg-red-400 flex items-center gap-2 justify-center">
            Live
            <SignalIcon className="w-6" />
          </div>
          <div className="absolute top-1 right-1">
            <div className="flex items-center gap-1">
              <EyeIcon className="w-6 text-white" />
              <span className="text-white font-semibold">{viewCount}</span>
            </div>
          </div>
        </div>

        <p className="text-white mb-2 font-semibold">
          Đừng bỏ lỡ! Bộ phim đang hot nhất hiện nay.
        </p>
      </DialogBody>

      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleClose}
          className="mr-1"
        >
          Đóng
        </Button>
        <a href={movieLink}>
          <Button className="flex items-center gap-3 bg-primary text-lg hover:opacity-80">
            <PlayCircleIcon className="w-6" />
            Xem Ngay
          </Button>
        </a>
      </DialogFooter>
    </Dialog>
  );
};

export default PopupWelcome;
