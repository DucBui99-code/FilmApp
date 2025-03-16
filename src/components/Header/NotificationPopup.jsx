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

import Empty from '../../assets/man.png';
import UserServices from '../../services/userServices';
import { useAlert } from '../Message/AlertContext';
import getErrorMessage from '../../utils/handelMessageError';
import { removeCountNoti } from '../../store/authSlice';

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

  useEffect(() => {
    if (!isLogin || !openNoti) return;
    setPage(1);
    setHasMore(true);
    setData([]);
  }, [openNoti]);

  useEffect(() => {
    if (!isLogin || !hasMore || !openNoti) {
      return;
    }

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
  }, [page, openNoti]);

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
        showAlert('Ẩn thông báo thành công', 'success');
        setData((prevData) =>
          prevData.filter((item) => item._id !== notificationId)
        );
      } else if (action === 'read') {
        await UserServices.readNotification({ notificationId });
        showAlert('Đọc thông báo thành công', 'success');
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

  return (
    <Popover
      placement="bottom"
      open={openNoti}
      handler={() => setOpenNoti(!openNoti)}
    >
      {countNoti > 0 ? (
        <Badge content={countNoti}>
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

      <PopoverContent className="w-[600px] min-h-96 bg-gray-800 border-black z-40">
        <div className="sticky top-0 bg-gray-800 z-50 pb-2 border-b border-gray-400">
          <Typography variant="h4" color="white" className="mb-2">
            Thông báo
          </Typography>
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
                    className="flex items-center gap-4 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all cursor-pointer"
                    key={el._id}
                    ref={isLastItem ? lastNotiRef : null}
                  >
                    <div className="self-start flex gap-2 items-center justify-center">
                      {!el.isRead && (
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      )}
                      <img
                        src={el.userSend.avatar}
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>

                    <div className="flex-1 self-start">
                      <div className="text-base text-white">
                        <span className="text-primary font-semibold pr-2">
                          {el.userSend.username}
                        </span>{' '}
                        đã nhắc đến bạn:
                        <Typography className="font-semibold">
                          {el.content}
                        </Typography>
                      </div>
                      <Typography className="text-gray-400 text-sm font-semibold mt-2">
                        {formatDistanceToNow(new Date(el.createdAt), {
                          addSuffix: true,
                          locale: vi,
                        })}
                      </Typography>
                    </div>

                    <img
                      src={el.movieData.image}
                      alt="image-movie"
                      className="w-40 h-24 rounded-lg object-cover self-start"
                    />

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
                <img src={Empty} alt="Empty" className="w-40" />
              </div>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default NotificationPopup;
