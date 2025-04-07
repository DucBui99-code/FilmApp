import React, { useEffect, useState } from 'react';
import {
  Collapse,
  Card,
  Textarea,
  Typography,
  CardBody,
  CardHeader,
  IconButton,
} from '@material-tailwind/react';
import {
  ChevronDownIcon,
  FaceSmileIcon,
  PaperAirplaneIcon,
  UserIcon,
} from '@heroicons/react/16/solid';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

import movieServices from '../../services/movieServices';
import socketClient from '../../services/socketClient';
import getErrorMessage from '../../utils/handelMessageError';
import { useAlert } from '../Message/AlertContext';
import { LINK_AVATAR_DEFAULT } from '../../config/constant';

const BlockLiveComment = ({ movieId }) => {
  const { isLogin } = useSelector((state) => state.auth);
  const { showAlert } = useAlert();

  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const [views, setViews] = useState(0);
  const toggleOpen = () => setOpen((cur) => !cur);

  const handleKeyDownEnter = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handelSubmit();
    }
  };
  const formatDate = (isoString) => {
    return format(new Date(isoString), 'hh:mm a');
  };

  useEffect(() => {
    const fetchLiveComments = async () => {
      try {
        const res = await movieServices.getliveComments(movieId);
        setData(res.data);
      } catch (error) {
        showAlert(getErrorMessage(error), 'error');
      }
    };
    fetchLiveComments();
    if (isLogin) {
      socketClient.connect();
      socketClient.emit('joinMovie', { movieId });

      socketClient.on('receiveComment', (data) => {
        setData((prev) => [...prev, data]);
      });
      socketClient.on('viewersCount', (data) => {
        setViews(data.count);
      });
      socketClient.on('error', (message) => {
        showAlert(message, 'error');
      });
    }

    return () => {
      socketClient.off('receiveComment');
      socketClient.off('error');
      socketClient.off('viewersCount');
      socketClient.emit('leaveMovie', { movieId });
    };
  }, [movieId, isLogin]);

  const handelSubmit = () => {
    if (message.trim() && isLogin) {
      // Logic to send the message
      socketClient.emit('sendComment', { movieId, content: message });
      setMessage('');
    }
  };

  return (
    <div>
      <Card className="bg-black border border-white">
        <CardHeader
          className="text-white bg-black p-3 cursor-pointer flex items-center justify-between"
          onClick={toggleOpen}
        >
          <div className="flex items-center">
            <Typography className="font-semibold mr-2">
              Trò chuyện trực tiếp
            </Typography>
            <span className="font-normal flex items-center text-primary">
              <UserIcon className="w-6 "></UserIcon> {views}
            </span>
          </div>
          <IconButton className="bg-inherit">
            {open ? (
              <ChevronDownIcon className="w-6 transform rotate-180"></ChevronDownIcon>
            ) : (
              <ChevronDownIcon className="w-6"></ChevronDownIcon>
            )}
          </IconButton>
        </CardHeader>
        <CardBody className="transition-all duration-300 p-3">
          <Collapse open={open} className="flex-1 overflow-hidden">
            <div className="max-h-[470px] min-h-[470px] overflow-y-scroll">
              {data.length === 0 ? (
                <Typography className="text-gray-400 text-center mt-4">
                  Không có bình luận nào.
                </Typography>
              ) : (
                data.map((user) => (
                  <div key={user.id} className="flex items-center gap-4 mt-4">
                    <img
                      src={user?.avatar || LINK_AVATAR_DEFAULT}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = LINK_AVATAR_DEFAULT;
                      }}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full self-start"
                      loading="lazy"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Typography className="text-white font-semibold text-sm">
                          {user.username}
                        </Typography>
                        <Typography className="text-gray-400 text-xs font-medium">
                          {formatDate(user.createdAt)}
                        </Typography>
                      </div>
                      <Typography className="text-gray-300 break-all font-normal">
                        {user.content}
                      </Typography>
                    </div>
                  </div>
                ))
              )}
              {/* Tạo khoảng trống để tránh bị che bởi input */}
              <div className="h-[30px]"></div>
            </div>
            {isLogin ? (
              <div className="w-full">
                <div className="flex w-full items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-800 p-1 mt-2">
                  <div className="flex">
                    <IconButton variant="text" className="rounded-full">
                      <FaceSmileIcon className="w-6 text-white"></FaceSmileIcon>
                    </IconButton>
                  </div>
                  <Textarea
                    rows={1}
                    resize={false}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDownEnter}
                    placeholder="Nhập tin nhắn..."
                    className="min-h-full !border-0 focus:border-transparent flex-1 text-white"
                    containerProps={{
                      className: 'grid h-full',
                    }}
                    labelProps={{
                      className: 'before:content-none after:content-none',
                    }}
                  />
                  <div>
                    <IconButton
                      variant="text"
                      className="rounded-full"
                      disabled={!message}
                      onClick={handelSubmit}
                    >
                      <PaperAirplaneIcon
                        className={`w-6 ${message === '' ? 'text-gray-600' : 'text-primary'}`}
                      ></PaperAirplaneIcon>
                    </IconButton>
                  </div>
                </div>
              </div>
            ) : (
              <Typography className="text-primary font-semibold text-lg text-center p-4">
                Đăng nhập để bình luận
              </Typography>
            )}
          </Collapse>
        </CardBody>
      </Card>
    </div>
  );
};

export default BlockLiveComment;
