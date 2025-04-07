import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  Avatar,
  Button,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

import movieServices from '../../../services/movieServices';
import iconUser from '../../../assets/225-default-avatar.png';
import { useAlert } from '../../Message/AlertContext';

const Rate = ({ props }) => {
  const RATE = [
    {
      value: 1,
      text: 'Quá tệ',
      icon: '😖',
    },
    {
      value: 2,
      text: 'Tệ',
      icon: '😟',
    },
    {
      value: 3,
      text: 'Bình thường',
      icon: '🙂',
    },
    {
      value: 4,
      text: 'Hay',
      icon: '😘',
    },
    {
      value: 5,
      text: 'Tuyệt vời',
      icon: '😍',
    },
  ];
  let page = 1;
  const { showAlert } = useAlert();
  const [isLastPage, setIsLastPage] = useState(false);
  const [listComment, setListComment] = useState([]);
  const [loadingComment, setLoadingComment] = useState(false);
  useEffect(() => {
    const getListComment = async () => {
      try {
        const res = await movieServices.getRateMovie(props.data.data._id, page);

        setIsLastPage(res.data.pagination.lastPage);
        setListComment(res.data.items);
      } catch (error) {
        showAlert(error.message, 'error');
      }
    };
    getListComment();
  }, []);
  const handleLoadComment = async () => {
    page++;
    setLoadingComment(true);
    try {
      const res = await movieServices.getRateMovie(props.data.data._id, page);
      setListComment((prev) => [...prev, ...res.data.items]);
      setIsLastPage(res.data.pagination.lastPage);
    } catch (error) {
      showAlert(getErrorMessage(error), 'error');
    } finally {
      setLoadingComment(false);
    }
  };

  const Usersex = ({ sex }) => {
    return (
      <div className="flex items-start justify-start">
        {sex === 'male' && <MaleIcon className="text-primary w-3 h-3" />}
        {sex === 'female' && <FemaleIcon className="text-primary w-3 h-3" />}
        {sex === 'other' && (
          <AllInclusiveIcon className="text-primary w-3 h-3" />
        )}
      </div>
    );
  };
  return (
    <div className="w-full flex items-center justify-between flex-col mt-3">
      <div className="flex items-baseline justify-between w-full">
        <Typography className="text-white font-semibold text-base">
          Tổng {listComment?.length || 0} đánh giá
        </Typography>
        <div className="w-60">
          <Select color="green" label="Sắp xếp theo" className="text-white ">
            <Option>Mới nhất</Option>
            <Option>Cũ nhất</Option>
          </Select>
        </div>
      </div>
      <div className="p-2 w-full mt-8">
        {listComment.length > 0 ? (
          listComment.map((comment, i) => (
            <div className="flex items-center gap-3 w-full mb-9" key={i}>
              <Avatar
                src={comment?.user.avatar.url || iconUser}
                alt="avatar"
                size="sm"
                className="self-start bg-white"
              />
              <div className="flex flex-col w-full">
                <div className="flex items-center justify-center gap-2 self-start">
                  <div className="p-1 bg-blue-800 rounded-lg flex items-center justify-between gap-2">
                    <p>{RATE[comment.star - 1].icon}</p>
                    <p className="text-white font-bold text-sm">
                      {RATE[comment.star - 1].text}
                    </p>
                  </div>
                  <Typography className="text-white font-bold">
                    {comment?.user.username}
                  </Typography>
                  <Usersex sex={comment?.user.sex}></Usersex>
                  <Typography className="text-gray-600 font-normal text-sm">
                    {dayjs(comment?.time).format('HH:mm - DD/MM/YYYY')}
                  </Typography>
                </div>
                <Typography className="text-white font-medium">
                  {comment.content}
                </Typography>
              </div>
            </div>
          ))
        ) : (
          <Typography className="text-white font-medium text-sm italic text-center mt-5 mb-5">
            Chưa có đánh giá nào cho phim này
          </Typography>
        )}
        {!isLastPage && listComment.length > 0 && (
          <div className="flex justify-center mt-10">
            <Button
              className="w-3/4 normal-case text-[14px] flex justify-center"
              variant="outlined"
              color="deep-orange"
              onClick={() => handleLoadComment()}
            >
              Tải thêm đánh giá
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rate;
