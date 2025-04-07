import {
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import { Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import rate1 from '../../assets/rate-1.webp';
import rate2 from '../../assets/rate-2.webp';
import rate3 from '../../assets/rate-3.webp';
import rate4 from '../../assets/rate-4.webp';
import rate5 from '../../assets/rate-5.webp';
import movieServices from '../../services/movieServices';
import { useAlert } from '../Message/AlertContext';

const PopupRating = ({ handleOpen, open, movie }) => {
  const RATE_LIST = [
    { id: 1, name: 'Rất tệ', icon: rate1 },
    { id: 2, name: 'Tệ', icon: rate2 },
    { id: 3, name: 'Bình thường', icon: rate3 },
    { id: 4, name: 'Hay', icon: rate4 },
    { id: 5, name: 'Rất hay', icon: rate5 },
  ];
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [content, setContent] = useState('');

  const handelClose = () => {
    handleOpen(!open);
    setSelectedRate(null);
  };

  const handleSubmit = async () => {
    if (!selectedRate) return;
    setLoading(true);
    try {
      await movieServices.addRateMovie({
        movieId: movie._id,
        star: selectedRate.id,
        content,
      });
      showAlert('Cảm ơn bạn đã đánh giá phim', 'success');
    } catch (error) {
      console.error('Error submitting rating:', error);
      showAlert('Có lỗi xảy ra. Vui lòng thử lại sau.', 'error');
    } finally {
      setLoading(false);
      handelClose();
    }
  };

  return (
    <>
      <Dialog size="md" open={open} className="bg-transparent shadow-none">
        <Card className="w-full bg-black text-white">
          <CardBody className="flex flex-col gap-4">
            <div className="flex items-center justify-center mb-4">
              <Typography variant="h4" color="white" className="text-center">
                Đánh giá phim
                <p className="text-primary text-center">{movie.name}</p>
              </Typography>
            </div>
            <div className="flex items-center justify-center gap-4 mb-4 bg-blue-gray-700 rounded-lg p-4">
              {RATE_LIST.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col items-center cursor-pointer transition-all duration-300 hover:brightness-100 hover:scale-105 p-3 rounded-lg ${
                    selectedRate?.id === item.id
                      ? 'bg-primary brightness-100'
                      : 'brightness-50'
                  }  `}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-16 h-16"
                    onClick={() => setSelectedRate(item)}
                  />

                  <Typography
                    variant="small"
                    color="white"
                    className="font-bold"
                  >
                    {item.name}
                  </Typography>
                </div>
              ))}
            </div>
            <Textarea
              color="green"
              label="Viết nhận xét về phim (Tùy chọn)"
              className="text-white"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={500}
            />
          </CardBody>
          <CardFooter className="pt-0 flex items-center justify-center gap-4">
            <Button
              variant="gradient"
              color="green"
              onClick={handleSubmit}
              loading={loading}
              disabled={loading || !selectedRate}
            >
              Gửi
            </Button>
            <Button variant="" onClick={handelClose}>
              Đóng
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default PopupRating;
