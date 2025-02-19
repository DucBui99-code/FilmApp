import React from 'react';
import { useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/16/solid';
import { Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router';

import UserServices from '../../../services/userServices';
import { useAlert } from '../../../components/Message/AlertContext';
import Empty from '../../../assets/man.png';

const FavoriteTab = ({ data }) => {
  const { showAlert } = useAlert();
  const [favoriteList, setFavoriteList] = useState(data); // Tạo state để quản lý danh sách

  useEffect(() => {
    setFavoriteList(data); // Cập nhật danh sách khi props thay đổi
  }, [data]);

  const handleRemove = async (id) => {
    const requestData = {
      movieId: id,
      action: 'remove',
    };

    try {
      const res = await UserServices.toggleFavoriteMovie(requestData);
      showAlert(res.message, 'success');

      // 🔥 Cập nhật danh sách ngay lập tức sau khi xóa
      setFavoriteList((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      showAlert(error.response?.data?.message, 'error');
    }
  };

  return (
    <div className="flex items-start justify-center md:justify-start flex-wrap gap-4 min-h-[300px]">
      {favoriteList.length > 0 ? (
        favoriteList.map((item) => (
          <div key={item._id} className="relative z-0">
            <div className="w-56 relative">
              <Link
                to={
                  item?.__t === 'DetailMovieRent'
                    ? `/xem-phim-goi/${item.slug}`
                    : `/xem-phim-mien-phi/${item.slug}`
                }
              >
                <img
                  src={item.poster_url}
                  className="rounded-md object-cover"
                  alt={item.name}
                />
              </Link>

              <div
                className="absolute top-2 right-2 bg-blue-gray-200 p-2 rounded-md cursor-pointer bg-opacity-70"
                onClick={() => handleRemove(item._id)}
              >
                <TrashIcon className="w-4 text-red-400" />
              </div>
            </div>
            <Typography className="w-56 text-white text-base mt-2 truncate">
              {item.name}
            </Typography>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <img src={Empty} alt="empty" className="w-32 object-cover" />
          <div className="text-white font-medium mt-4">
            Bạn chưa thêm bộ phim yêu thích nào vào danh sách
          </div>

          <Link to={'/'}>
            <Button className="flex items-center bg-primary mt-6 text-base">
              Xem phim
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoriteTab;
