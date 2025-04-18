import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Button,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from '@material-tailwind/react';

import dayjs from 'dayjs';
import { useAlert } from '../../Message/AlertContext';

import iconUser from '../../../assets/225-default-avatar.png';
import movieServices from '../../../services/movieServices';
import { useSelector } from 'react-redux';
import CommentActions from './CommentAction';
import RenderMenu from './RenderMenu';
import { FaceSmileIcon } from '@heroicons/react/16/solid';
import EmojiPicker from 'emoji-picker-react';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

const Reply = ({
  data,
  reply,
  menuItemsSelf,
  menuItemsAnother,
  handleToggleLikeAndDislike,
  movieId,
  updateReplies,
  onReplyInput,
  idEditReply,
  updateReplyContent,
}) => {
  const { showAlert } = useAlert();
  const { userInfo, userId } = useSelector((state) => state.auth);
  const spanRef = useRef(null);
  const [showReply, setShowReply] = useState(false);
  const [text, setText] = useState('');
  const [paddingInput, setPaddingInput] = useState('0px');
  const [contentEdit, setContentEdit] = useState('');
  const limitCharacters = 100;
  const [isEdit, setEdit] = useState(false);

  const onEmojiClick = (event) => {
    if (text.length + event.emoji.length > 100) {
      return;
    }
    setText((prev) => prev + event.emoji);
  };

  const onReply = () => {
    setShowReply(!showReply);
  };

  const handleEditReply = async () => {
    const dataBody = {
      movieId: movieId,
      content: contentEdit,
      commentId: data._id,
      type: 'reply', //Type có 2 loai bao gồm: comment hoặc reply
      replyId: idEditReply, // Bắt buộc truyền khi có edit reply
    };
    try {
      const res = await movieServices.editComment(dataBody);
      if (res.status) {
        updateReplyContent(idEditReply, contentEdit);
        setEdit(false);
      }
    } catch (error) {
      showAlert(error.message, 'error');
    }
  };

  const replyComment = async () => {
    const dataBody = {
      content: text,
      type: 'reply',
      commentId: data._id,
      replyId: reply._id,
      isTagName: true,
    };

    try {
      const res = await movieServices.postComment(dataBody);
      updateReplies(res.data);

      setShowReply(false);
      setText('');
      onReplyInput();
    } catch (error) {
      if (error?.status == '401') {
        showAlert('Vui lòng đăng nhập để thực hiện thao tác này', 'error');
      }
    }
  };

  useEffect(() => {
    if (reply._id === idEditReply) {
      setEdit(true);
      setContentEdit(reply.content);
    }
  }, [idEditReply]);

  useEffect(() => {
    if (spanRef.current) {
      setPaddingInput(spanRef.current.offsetWidth + 4 + 'px');
    }
  }, [showReply]);

  const Usersex = ({ sex }) => {
    return (
      <div className="flex items-start justify-start">
        {sex === 'Male' && <MaleIcon className="text-primary w-3 h-3" />}
        {sex === 'Female' && <FemaleIcon className="text-primary w-3 h-3" />}
        {sex === 'Other' && (
          <AllInclusiveIcon className="text-primary w-3 h-3" />
        )}
      </div>
    );
  };
  return (
    <div className="mt-2 flex justify-between items-center w-full flex-col">
      <div className="flex items-center gap-3 justify-between w-full">
        <div className="flex items-center gap-3 w-full">
          <Avatar
            src={reply?.userDetails.avatar || iconUser}
            alt="avatar"
            size="sm"
            className="self-start bg-white"
          />
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-center gap-2 self-start">
              <Typography className="text-white font-bold">
                {reply?.userDetails.username}
              </Typography>
              <Usersex sex={reply?.userDetails.sex}></Usersex>
              <Typography className="text-gray-600 font-normal text-sm">
                {dayjs(reply?.time).format('HH:mm - DD/MM/YYYY')}
              </Typography>
              {reply.edited && (
                <Typography className="text-gray-600 font-normal text-sm">
                  (đã chỉnh sửa)
                </Typography>
              )}
            </div>
            {!isEdit ? (
              <Typography className="text-white font-medium flex items-center gap-1">
                <span className="text-primary font-semibold">
                  {reply.replyToUsername}
                </span>
                {reply.content}
              </Typography>
            ) : (
              <>
                <Input
                  placeholder="Your Comment..."
                  value={contentEdit}
                  variant="static"
                  className="text-white"
                  color="green"
                  onChange={(e) => setContentEdit(e.target.value)}
                />
                <div className="flex justify-end mt-1">
                  <Button
                    size="sm"
                    color="red"
                    variant="text"
                    className="rounded-md"
                    onClick={() => {
                      setEdit(false);
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
                    onClick={() => handleEditReply()}
                  >
                    Edit
                  </Button>
                </div>
              </>
            )}
            <CommentActions
              likes={reply.likes}
              disLikes={reply.disLikes}
              likesRef={reply?.likesRef}
              disLikesRef={reply?.disLikesRef}
              handleToggleLikeAndDislike={handleToggleLikeAndDislike}
              onReply={onReply}
              userId={userId}
              type="reply"
              replyId={reply._id}
            />
          </div>
        </div>
        <RenderMenu
          data={data}
          isOwner={reply.userDetails?.username == userInfo?.username}
          idReply={reply._id}
          menuItemsSelf={menuItemsSelf}
          menuItemsAnother={menuItemsAnother}
          type="reply"
        />
      </div>
      {showReply && (
        <div className="flex items-center gap-3 w-full">
          <Avatar
            src={userInfo?.avatar?.url || iconUser}
            alt="avatar"
            size="sm"
            className="self-start bg-white"
          />
          <div className="relative w-full">
            <span
              ref={spanRef}
              className="absolute top-[36%] left-0 bg-gray-800 px-[4px] text-white rounded-md text-sm"
            >
              {reply?.userDetails.username}
            </span>
            <Input
              placeholder="Your Comment..."
              value={text}
              variant="static"
              className="text-white leading-none"
              color="green"
              style={{ paddingLeft: paddingInput }}
              onChange={(e) => setText(e.target.value)}
            />
            <div
              className={`absolute right-2 bottom-2 ${
                text.length >= 100 ? 'text-red-500' : 'text-gray-500'
              } text-sm font-medium flex items-center justify-center gap-1`}
            >
              <div>{text.length}</div>/<div>{100}</div>
            </div>
          </div>
        </div>
      )}

      {text.length > 0 && (
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
                setShowReply(false);
              }}
            >
              Hủy bỏ
            </Button>
            <Button
              size="sm"
              className="rounded-md bg-primary"
              disabled={text.length <= 0 || text.length > 100}
              onClick={() => replyComment()}
            >
              Bình luận
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reply;
