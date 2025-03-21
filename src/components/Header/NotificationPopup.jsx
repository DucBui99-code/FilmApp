import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  IconButton,
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
  Badge,
  Spinner,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react';
import {
  ArchiveBoxXMarkIcon,
  BellAlertIcon,
  EllipsisVerticalIcon,
  EyeSlashIcon,
} from '@heroicons/react/16/solid';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import vi from 'date-fns/locale/vi';
import { Link } from 'react-router';

import Empty from '../../assets/man.png';
import UserServices from '../../services/userServices';
import { useAlert } from '../Message/AlertContext';
import getErrorMessage from '../../utils/handelMessageError';
import { removeCountNoti, resetCountNoti } from '../../store/authSlice';
import SystemImage from '../../assets/system.png';

function NotificationPopup({ setOpenNoti, openNoti }) {
  const { countNoti, isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const observer = useRef(null); // Thêm useRef cho observer
  const MENU = [
    {
      action: 'hiden',
      icon: <EyeSlashIcon className="text-white w-6" />,
      content: 'Ẩn thông báo này',
    },
    {
      action: 'read',
      icon: <ArchiveBoxXMarkIcon className="text-white w-6" />,
      content: 'Đánh dấu đã đọc',
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const fetchedPages = useRef(new Set()); // Track các page đã fetch

  useEffect(() => {
    if (!isLogin || !openNoti) return;
    setPage(1);
    setHasMore(true);
    setData([]);
    fetchedPages.current.clear(); // Xóa history khi reset
  }, [isLogin, openNoti]);

  useEffect(() => {
    if (!isLogin) {
      setData([]);
      dispatch(resetCountNoti());
      return;
    }
    if (!hasMore || !openNoti) {
      return;
    }

    if (fetchedPages.current.has(page)) return;
    fetchedPages.current.add(page);

    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await UserServices.getMyNotification(page);
        setData((prev) => (page === 1 ? res.data : [...prev, ...res.data]));
        setHasMore(!res.isLastPage);
      } catch (error) {
        showAlert(getErrorMessage(error), 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, openNoti, isLogin]);

  const lastNotiRef = useCallback(
    (node) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const handleAction = async (action, notificationId, isRead) => {
    try {
      if (action === 'hiden') {
        await UserServices.hidenNotification({ notificationId });
        if (!isRead) dispatch(removeCountNoti());
        setData((prevData) =>
          prevData.filter((item) => item._id !== notificationId)
        );
      } else if (action === 'read') {
        await UserServices.readNotification({ notificationId });
        dispatch(removeCountNoti());
        setData((prevData) =>
          prevData.map((item) =>
            item._id === notificationId ? { ...item, isRead: true } : item
          )
        );
      } else {
        showAlert('Hành động không hợp lệ', 'error');
      }
    } catch (error) {
      showAlert(getErrorMessage(error), 'error');
    }
  };

  const handelReadAllNotification = async () => {
    try {
      await UserServices.readAllNotification();
      setData((pre) => pre.map((item) => ({ ...item, isRead: true })));
      dispatch(resetCountNoti());
    } catch (error) {
      showAlert(getErrorMessage(error), 'error');
    }
  };

  const ShowContent = ({ noti }) => {
    switch (noti.type) {
      case 'like':
        return (
          <div className="text-base text-white">
            <span className="text-primary font-semibold pr-2">
              {noti.userSend.username}
            </span>
            đã thích bình luận của bạn
          </div>
        );
      case 'reply':
        return (
          <div className="text-base text-white">
            <span className="text-primary font-semibold pr-2">
              {noti.userSend.username}
            </span>{' '}
            đã nhắc đến bạn:
            <Typography className="font-semibold">{noti.content}</Typography>
          </div>
        );
      case 'system':
        return <div className="text-base text-white">{noti.content}</div>;

      default:
        break;
    }
  };

  return (
    <Popover
      placement="bottom"
      open={openNoti}
      handler={() => setOpenNoti(!openNoti)}
    >
      {countNoti > 0 ? (
        <Badge content={countNoti > 9 ? '9+' : countNoti}>
          <PopoverHandler>
            <IconButton>
              <BellAlertIcon className="w-6 text-white hover:text-primary transition-colors"></BellAlertIcon>
            </IconButton>
          </PopoverHandler>
        </Badge>
      ) : (
        <PopoverHandler>
          <IconButton>
            <BellAlertIcon className="w-6 text-white hover:text-primary transition-colors"></BellAlertIcon>
          </IconButton>
        </PopoverHandler>
      )}

      <PopoverContent className="w-[500px] min-h-96 bg-gray-800 border-black z-40">
        <div className="sticky top-0 bg-gray-800 z-50 pb-2 border-b border-gray-400 flex items-center justify-between">
          <Typography variant="h4" color="white" className="mb-2">
            Thông báo
          </Typography>
          {data.length > 0 && (
            <Button
              variant="text"
              onClick={handelReadAllNotification}
              className="text-primary font-semibold text-sm"
              size="sm"
            >
              Đánh dẫu đã đọc
            </Button>
          )}
        </div>

        {isLoading && page === 1 ? (
          <div className="flex items-center justify-center h-40">
            <Spinner className="w-10 h-10 text-primary" />
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto pt-2">
            {data.length > 0 ? (
              data.map((el, index) => {
                const isLastItem = index === data.length - 1;
                return (
                  <div
                    className="flex items-center gap-4 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all cursor-pointer mb-2"
                    key={el._id}
                    ref={isLastItem ? lastNotiRef : null}
                  >
                    <div className="self-start flex gap-2 items-center justify-center">
                      {!el.isRead && (
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      )}
                      <img
                        src={
                          el.type === 'system'
                            ? SystemImage
                            : el.userSend.avatar
                        }
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>

                    <div className="flex-1 self-start">
                      <ShowContent noti={el}></ShowContent>
                      <Typography className="text-gray-400 text-sm font-semibold mt-2">
                        {formatDistanceToNow(new Date(el.createdAt), {
                          addSuffix: true,
                          locale: vi,
                        })}
                      </Typography>
                    </div>
                    {el.type !== 'system' && el.movieData && (
                      <Link
                        to={
                          el.movieData?.type
                            ? `/xem-phim-goi/${el.movieData?.slug}`
                            : `/xem-phim-mien-phi/${el.movieData?.slug}`
                        }
                        className="self-start"
                      >
                        <img
                          src={el.movieData?.image}
                          alt="image-movie"
                          className="w-30 h-12 rounded-lg object-cover "
                        />
                      </Link>
                    )}

                    <Menu>
                      <MenuHandler>
                        <EllipsisVerticalIcon className="w-6 text-white self-start" />
                      </MenuHandler>
                      <MenuList className="bg-gray-800 p-1 border-gray-600">
                        {MENU.map((item) => (
                          <MenuItem
                            key={item.action}
                            className="flex items-center gap-2 hover:opacity-90"
                            onClick={() =>
                              handleAction(item.action, el._id, el.isRead)
                            }
                          >
                            {item.icon}
                            <Typography
                              variant="small"
                              className="font-semibold text-white"
                            >
                              {item.content}
                            </Typography>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center justify-center">
                <img src={Empty} alt="Empty" className="w-40 pt-8" />
              </div>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default NotificationPopup;
