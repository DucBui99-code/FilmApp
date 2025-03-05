import React, { useState } from 'react';
import {
  Collapse,
  Button,
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

const BlockLiveComment = () => {
  const { isLogin } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState('');
  const toggleOpen = () => setOpen((cur) => !cur);

  const LIST_USERS = [
    {
      id: 1,
      name: 'Lê Thị Hồng',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      time: '10:00 AM',
      content: 'Hello everyone!',
    },
    {
      id: 2,
      name: 'Nguyễn Văn A',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      time: '10:05 AM',
      content: 'Good morning!',
    },
    {
      id: 3,
      name: 'Trần Thị B',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      time: '10:10 AM',
      content: 'How are you?',
    },
    {
      id: 4,
      name: 'Phạm Văn C',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      time: '10:15 AM',
      content: 'I am fine, thank you!',
    },
    {
      id: 5,
      name: 'Hoàng Thị D',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      time: '10:20 AM',
      content: 'What are you doing?',
    },
    {
      id: 6,
      name: 'Vũ Văn E',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      time: '10:25 AM',
      content: 'I am working.',
    },
    {
      id: 7,
      name: 'Đỗ Thị F',
      avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
      time: '10:30 AM',
      content: 'Nice to meet you!',
    },
    {
      id: 8,
      name: 'Lý Văn G',
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
      time: '10:35 AM',
      content: 'Nice to meet you too!',
    },
    {
      id: 9,
      name: 'Ngô Thị H',
      avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
      time: '10:40 AM',
      content:
        'Have a great day!akwejfkjwekfjwekjfkwejfkjafjakwjfkwjekjewerwerwerwerewrewr',
    },
    {
      id: 10,
      name: 'Bùi Văn I',
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
      time: '10:45 AM',
      content: 'You too!',
    },
  ];

  const handleKeyDownEnter = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handelSubmit();
    }
  };

  const handelSubmit = () => {
    if (message.trim() && isLogin) {
      // Logic to send the message
      console.log('Message sent:', message);
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
              <UserIcon className="w-6 "></UserIcon> 112
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
          {/* Danh sách tin nhắn có scroll */}
          <Collapse open={open} className="flex-1 overflow-hidden">
            <div className="max-h-[470px] overflow-y-scroll">
              {LIST_USERS.map((user) => (
                <div key={user.id} className="flex items-center gap-4 mt-4">
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full self-start"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <Typography className="text-white font-semibold text-sm">
                        {user.name}
                      </Typography>
                      <Typography className="text-gray-400 text-xs font-medium">
                        {user.time}
                      </Typography>
                    </div>
                    <Typography className="text-gray-300 break-all font-normal">
                      {user.content}
                    </Typography>
                  </div>
                </div>
              ))}
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
