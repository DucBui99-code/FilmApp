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
import React, { useEffect, useState } from 'react';
import { FaceSmileIcon } from '@heroicons/react/16/solid';
import BlockComment from './Comment/BlockComment';
import { useAlert } from '../Message/AlertContext';
import movieServices from '../../services/movieServices';
import getErrorMessage from '../../utils/handelMessageError';
import { useSelector } from 'react-redux';
import iconUser from '../../assets/225-default-avatar.png';

function CommentMovie(props) {
  let page = 1;
  const { isLogin, userId, userInfo } = useSelector((state) => state.auth);
  const limitCharacters = 100;
  const { showAlert } = useAlert();
  const [loadingComment, setLoadingComment] = useState(false);
  const [text, setText] = useState('');
  const [isShowAction, setIsShowAction] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [listComment, setListComment] = useState([]);

  const updateReactionComment = (
    commentId,
    likes,
    disLikes,
    likesRef,
    disLikesRef
  ) => {
    setListComment((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId
          ? { ...comment, likes, disLikes, likesRef, disLikesRef }
          : comment
      )
    );
  };

  const updateComment = (_id, newContent) => {
    setListComment((prevComments) =>
      prevComments.map((comment) =>
        comment._id === _id
          ? { ...comment, content: newContent, edited: true }
          : comment
      )
    );
  };

  const deleteComment = (_id) => {
    setListComment((prevComments) =>
      prevComments.filter((comment) => comment._id !== _id)
    );
  };

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

  const commentMovie = async () => {
    if (!isLogin) {
      showAlert('Vui lòng đăng nhập để đóng góp ý kiến!', 'error');
      return;
    }
    try {
      const res = await movieServices.postComment({
        movieId: props.data.data._id,
        content: text,
        type: 'comment',
      });
      if (res.status) {
        showAlert('Cảm ơn bạn đã đóng góp ý kiến cho bộ phim này!', 'success');
        setText('');
        setListComment((prev) => [res.data, ...prev]);
      } else {
        showAlert(getErrorMessage(error), 'error');
      }
    } catch (error) {
      showAlert(getErrorMessage(error), 'error');
    }
  };

  const handleLoadComment = async () => {
    page++;
    setLoadingComment(true);
    try {
      const res = await movieServices.getCommentByMovieId(
        props.data.data._id,
        page
      );
      listComment.push(...res.comments);
      setIsLastPage(res.isLastPage);
    } catch (error) {
      showAlert(getErrorMessage(error), 'error');
    } finally {
      setLoadingComment(false);
    }
  };

  useEffect(() => {
    const getListComment = async () => {
      try {
        const res = await movieServices.getCommentByMovieId(
          props.data.data._id
        );

        setIsLastPage(res.isLastPage);
        setListComment(res.comments);
      } catch (error) {
        showAlert(error.message, 'error');
      }
    };
    getListComment();
  }, []);

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
            Tổng {listComment?.length || 0} bình luận
          </Typography>
          <div className="w-60">
            <Select color="green" label="Sắp xếp theo" className="text-white ">
              <Option>Mới nhất</Option>
              <Option>Cũ nhất</Option>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full mt-4">
          <Avatar
            src={userInfo?.avatar.url || iconUser}
            alt="avatar"
            size="md"
            className="self-start bg-white"
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
                    Hủy bỏ
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-md bg-primary"
                    disabled={text.length <= 0 || text.length > limitCharacters}
                    onClick={() => commentMovie('post')}
                  >
                    Bình luận
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-2 w-full mt-8">
          {listComment.map((comment, i) => (
            <BlockComment
              data={comment}
              movieData={props}
              userId={userId}
              key={i}
              updateComment={updateComment}
              deleteComment={deleteComment}
              updateReactionComment={updateReactionComment}
            ></BlockComment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommentMovie;
