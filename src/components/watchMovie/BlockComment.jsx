import React, { useState } from "react";
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
} from "@material-tailwind/react";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  FlagIcon,
} from "@heroicons/react/16/solid";
import { FaceSmileIcon } from "@heroicons/react/16/solid";
import EmojiPicker from "emoji-picker-react";

// Render menu items
const RenderMenu = ({ isOwner, menuItemsSelf, menuItemsAnother }) => (
  <div className="self-start">
    <Menu placement="top">
      <MenuHandler>
        <IconButton variant="text">
          <EllipsisVerticalIcon className="w-5 text-white" />
        </IconButton>
      </MenuHandler>
      <MenuList className="bg-blue-gray-900 p-1 border-gray-600">
        {(isOwner ? menuItemsSelf : menuItemsAnother).map((el) => (
          <MenuItem key={el.id} className="flex items-center gap-2">
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
const Reply = ({ reply, menuItemsSelf, menuItemsAnother }) => (
  <div className="mt-2 flex justify-between items-center w-full">
    <div className="flex items-center gap-3 justify-between w-full">
      <div className="flex items-center gap-3">
        <Avatar
          src={reply.avatar}
          alt="avatar"
          size="sm"
          className="self-start"
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
            <Typography className="text-primary font-semibold">
              {reply.replyTo}
            </Typography>
            {reply.content}
          </Typography>
          <CommentActions likes={reply.likes} disLikes={reply.disLikes} />
        </div>
      </div>
      <RenderMenu
        isOwner={reply.isOwner}
        menuItemsSelf={menuItemsSelf}
        menuItemsAnother={menuItemsAnother}
      />
    </div>
  </div>
);

const ReplyInput = ({ data }) => {
  const limitCharacters = 100;
  const [text, setText] = useState("");
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
      <Avatar src={data.avatar} alt="avatar" size="sm" className="mt-2" />
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
              text.length >= limitCharacters ? "text-red-500" : "text-gray-500"
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
                  width={"500px"}
                  height={"400px"}
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
                  setText("");
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

const BlockComment = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [replyInput, setReplyInput] = useState(false);

  const MenuListCommentSelf = [
    { id: 0, content: "Chỉnh sửa", icon: <PencilIcon className="w-4" /> },
    { id: 1, content: "Xóa", icon: <TrashIcon className="w-4" /> },
  ];

  const MenuListCommentAnother = [
    { id: 0, content: "Báo cáo", icon: <FlagIcon className="w-4" /> },
  ];

  return (
    <div className="mt-2 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Avatar
          src={data?.avatar}
          alt="avatar"
          size="sm"
          className="self-start"
        />
        <div className="flex flex-col">
          <div className="flex items-center justify-center gap-2 self-start">
            <Typography className="text-white font-bold">
              {data?.user}
            </Typography>
            <Typography className="text-gray-600 font-normal text-sm">
              {data?.time}
            </Typography>
          </div>
          <Typography className="text-white font-medium">
            {data?.content}
          </Typography>
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
        isOwner={data?.isOwner}
        menuItemsSelf={MenuListCommentSelf}
        menuItemsAnother={MenuListCommentAnother}
      />
    </div>
  );
};

export default BlockComment;
