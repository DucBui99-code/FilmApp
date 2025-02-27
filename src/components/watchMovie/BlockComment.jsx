import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Collapse,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  FlagIcon,
} from '@heroicons/react/16/solid';
import { FaceSmileIcon } from '@heroicons/react/16/solid';
import EmojiPicker from 'emoji-picker-react';
import dayjs from 'dayjs';
import iconUser from '../../assets/225-default-avatar.png';
import movieServices from '../../services/movieServices';

// Render menu items
const RenderMenu = ({ data, isOwner, menuItemsSelf, menuItemsAnother }) => (
  <div className="self-start">
    <Menu placement="top">
      <MenuHandler>
        <IconButton variant="text">
          <EllipsisVerticalIcon className="w-5 text-white" />
        </IconButton>
      </MenuHandler>
      <MenuList className="bg-blue-gray-900 p-1 border-gray-600">
        {(isOwner ? menuItemsSelf : menuItemsAnother).map((el) => (
          <MenuItem
            key={el.id}
            className="flex items-center gap-2"
            onClick={() => el.action(data)}
          >
            {el.icon}
            {el.content}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  </div>
);

// Comment actions component
const CommentActions = ({ likes, disLikes, onReply }) => (
  <div className="flex items-center justify-center gap-2 self-start">
    <div className="flex items-center justify-center gap-2">
      <HandThumbUpIcon className="w-6 text-gray-500 cursor-pointer hover:opacity-70" />
      <Typography className="text-gray-600 font-semibold">{likes}</Typography>
    </div>
    <div className="flex items-center justify-center gap-2">
      <HandThumbDownIcon className="w-6 text-gray-500 cursor-pointer hover:opacity-70" />
      <Typography className="text-gray-600 font-semibold">
        {disLikes}
      </Typography>
    </div>
    <Button
      variant="text"
      className="text-gray-600 font-medium"
      onClick={onReply}
    >
      Phản hồi
    </Button>
  </div>
);

// Reply component
const Reply = ({ data, reply, menuItemsSelf, menuItemsAnother }) => (
  <div className="mt-2 flex justify-between items-center w-full">
    <div className="flex items-center gap-3 justify-between w-full">
      <div className="flex items-center gap-3">
        <Avatar
          src={reply.avatar || iconUser}
          alt="avatar"
          size="sm"
          className="self-start bg-white"
        />
        <div className="flex flex-col">
          <div className="flex items-center justify-center gap-2 self-start">
            <Typography className="text-white font-bold">
              {reply.user}
            </Typography>
            <Typography className="text-gray-600 font-normal text-sm">
              {reply.time}
            </Typography>
          </div>
          <Typography className="text-white font-medium flex items-center gap-1">
            <span className="text-primary font-semibold">{reply.replyTo}</span>
            {reply.content}
          </Typography>
          <CommentActions likes={reply.likes} disLikes={reply.disLikes} />
        </div>
      </div>
      <RenderMenu
        data={data}
        isOwner={reply.isOwner}
        menuItemsSelf={menuItemsSelf}
        menuItemsAnother={menuItemsAnother}
      />
    </div>
  </div>
);

const ReplyInput = ({ data }) => {
  const limitCharacters = 100;
  const [text, setText] = useState('');
  const [isShowAction, setIsShowAction] = useState(false);

  const handelTextComment = (value) => {
    if (value.length > limitCharacters) {
      return;
    }
    setIsShowAction(true);
    setText(value);
  };

  const onEmojiClick = (event) => {
    if (text.length + event.emoji.length > limitCharacters) {
      return;
    }
    setText((prev) => prev + event.emoji);
  };

  return (
    <div className="w-full flex gap-2 mb-2">
      <Avatar
        src={data.avatar || iconUser}
        alt="avatar"
        size="sm"
        className="mt-2 bg-white"
      />
      <div className="w-full self-start">
        <div className="relative">
          <Input
            placeholder="Your Comment..."
            value={text}
            variant="static"
            className="text-white"
            color="green"
            onChange={(e) => handelTextComment(e.target.value)}
          />
          <div
            className={`absolute right-2 bottom-2 ${
              text.length >= limitCharacters ? 'text-red-500' : 'text-gray-500'
            } text-sm font-medium flex items-center justify-center gap-1`}
          >
            <div>{text.length}</div>/<div>{limitCharacters}</div>
          </div>
        </div>
        {isShowAction && (
          <div className="flex w-full items-center justify-between py-1.5 mt-2">
            <Menu placement="bottom-end">
              <MenuHandler>
                <IconButton>
                  <FaceSmileIcon className="w-4 text-white"></FaceSmileIcon>
                </IconButton>
              </MenuHandler>
              <MenuList className="bg-black">
                <EmojiPicker
                  theme="dark"
                  width={'500px'}
                  height={'400px'}
                  onEmojiClick={onEmojiClick}
                ></EmojiPicker>
              </MenuList>
            </Menu>
            <div className="flex gap-2">
              <Button
                size="sm"
                color="red"
                variant="text"
                className="rounded-md"
                onClick={() => {
                  setText('');
                  setIsShowAction(false);
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="rounded-md bg-primary"
                disabled={text.length <= 0 || text.length > limitCharacters}
              >
                Post
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BlockComment = ({ data, userId, movieData }) => {
  const [open, setOpen] = useState(false);
  const [replyInput, setReplyInput] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const limitCharacters = 100;
  const [contentEdit, setContentEdit] = useState('');
  const handelTextComment = (e) => {
    setContentEdit(e);
  };

  const MenuListCommentSelf = [
    {
      id: 0,
      content: 'Chỉnh sửa',
      icon: <PencilIcon className="w-4" />,
      action: () => {
        console.log('Chỉnh sửa');
        console.log('Chỉnh sửa', data);
        setIsEdit(true);
        setContentEdit(data.content);
      },
    },
    {
      id: 1,
      content: 'Xóa',
      icon: <TrashIcon className="w-4" />,
      action: async () => {
        const res = await movieServices.deleteComment({
          movieId: movieData.data.movieId,
          commentId: data._id,
          type: 'comment',
        });
        console.log('Xóa', res);
      },
    },
  ];

  const MenuListCommentAnother = [
    {
      id: 0,
      content: 'Báo cáo',
      icon: <FlagIcon className="w-4" />,
      action: () => {
        console.log('Báo cáo');
      },
    },
  ];

  useEffect(() => {
    console.log(data);
    console.log(userId);
  }, []);

  return (
    <div className="mt-2 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Avatar
          src={data?.avatar || iconUser}
          alt="avatar"
          size="sm"
          className="self-start bg-white"
        />
        <div className="flex flex-col">
          <div className="flex items-center justify-center gap-2 self-start">
            <Typography className="text-white font-bold">
              {data?.userDetails.username}
            </Typography>
            <Typography className="text-gray-600 font-normal text-sm">
              {dayjs(data?.time).format('HH:mm - DD/MM/YYYY')}
            </Typography>
          </div>
          {!isEdit ? (
            <Typography className="text-white font-medium">
              {data?.content}
            </Typography>
          ) : (
            <>
              <Input
                placeholder="Your Comment..."
                value={contentEdit}
                variant="static"
                className="text-white"
                color="green"
                onChange={(e) => handelTextComment(e.target.value)}
              />
              <div className="flex justify-end mt-1">
                <Button
                  size="sm"
                  color="red"
                  variant="text"
                  className="rounded-md"
                  onClick={() => {
                    setIsEdit(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="rounded-md bg-primary"
                  disabled={
                    contentEdit.length <= 0 ||
                    contentEdit.length > limitCharacters
                  }
                >
                  Edit
                </Button>
              </div>
            </>
          )}

          <CommentActions
            likes={data?.likes}
            disLikes={data?.disLikes}
            onReply={() => {
              setReplyInput(!replyInput);
            }}
          />

          {replyInput && <ReplyInput data={data}></ReplyInput>}
          {data?.replies?.length > 0 && (
            <div>
              <Button
                variant="text"
                className="text-primary w-fit normal-case flex items-center gap-2 p-0"
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <ChevronUpIcon className="w-6" />
                ) : (
                  <ChevronDownIcon className="w-6" />
                )}
                <Typography>{data?.replies?.length} phản hồi</Typography>
              </Button>
              <Collapse open={open}>
                {data.replies.map((reply, i) => (
                  <Reply
                    data={data}
                    key={i}
                    reply={reply}
                    menuItemsSelf={MenuListCommentSelf}
                    menuItemsAnother={MenuListCommentAnother}
                  />
                ))}
              </Collapse>
            </div>
          )}
        </div>
      </div>
      <RenderMenu
        data={data}
        isOwner={data?.user === userId}
        menuItemsSelf={MenuListCommentSelf}
        menuItemsAnother={MenuListCommentAnother}
      />
    </div>
  );
};

export default BlockComment;
