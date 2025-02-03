import {
  Avatar,
  Button,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import EmojiPicker from 'emoji-picker-react';
import React, { useState } from 'react';
import BlockComment from './BlockComment';
import dataComments from './test.json';
import { FaceSmileIcon } from '@heroicons/react/16/solid';

function CommentMovie() {
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
    <div className="p-3 flex flex-col items-center justify-center">
      <Typography
        as={'h1'}
        className="text-white font-bold text-2xl self-start"
      >
        Bình Luận
      </Typography>
      <div className="w-full flex items-center justify-between flex-col mt-3">
        <div className="flex items-baseline justify-between w-full">
          <Typography className="text-white font-semibold text-base">
            Tổng 18 bình luận
          </Typography>
          <div className="w-60">
            <Select color="white" label="Select mode" className="text-white">
              <Option>Mới nhất</Option>
              <Option>Cũ nhất</Option>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full mt-4">
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
            size="md"
            className="self-start"
          />
          <div className="w-full">
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
                  text.length >= limitCharacters
                    ? 'text-red-500'
                    : 'text-gray-500'
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
        <div className="p-2 w-full mt-8">
          {dataComments.comments.map((comment, i) => (
            <BlockComment data={comment} key={i}></BlockComment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommentMovie;
