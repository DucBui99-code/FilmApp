import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Collapse,
  Input,
  Typography,
} from '@material-tailwind/react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  TrashIcon,
  FlagIcon,
} from '@heroicons/react/16/solid';
import dayjs from 'dayjs';
import { useAlert } from '../../Message/AlertContext';

import iconUser from '../../../assets/225-default-avatar.png';
import movieServices from '../../../services/movieServices';
import useReactiveState from '../../../hooks/useReactiveState';
import ReplyInput from './ReplyInput';
import CommentActions from './CommentAction';
import Reply from './Reply';
import RenderMenu from './RenderMenu';
import getErrorMessage from '../../../utils/handelMessageError';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

const BlockComment = ({
  data,
  userId,
  movieData,
  updateComment,
  deleteComment,
  updateReactionComment,
}) => {
  const { showAlert } = useAlert();

  const [open, setOpen] = useState(false);
  const [replies, setReplies] = useState([]);
  const [replyInput, setReplyInput] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idEditReply, setIdEditReply] = useReactiveState('');
  const limitCharacters = 100;
  const [contentEdit, setContentEdit] = useState('');
  const [isLastPage, setIsLastPage] = useState(true);
  let page = 1;

  const onReply = () => {
    setReplyInput(!replyInput);
  };

  const handleToggleLikeAndDislike = async (
    typeAction,
    type,
    replyId = null
  ) => {
    const bodyData = {
      movieId: movieData.data.movieId,
      commentId: data._id,
      typeAction: typeAction,
      type: type,
      replyId: replyId,
    };
    try {
      const res = await movieServices.toggleReactionComment(bodyData);
      if (type === 'comment') {
        updateReactionComment(
          data._id,
          res.likes,
          res.disLikes,
          res.likesRef,
          res.disLikesRef
        );
      } else {
        updateReactionReply(
          replyId,
          res.likes,
          res.disLikes,
          res.likesRef,
          res.disLikesRef
        );
      }
    } catch (error) {
      if (error.status === 401) {
        showAlert('Vui lòng đăng nhập để thực hiện thao tác này', 'error');
        return;
      }
    }
  };

  const updateReactionReply = (
    replyId,
    likes,
    disLikes,
    likesRef,
    disLikesRef
  ) => {
    setReplies((prev) =>
      prev.map((reply) =>
        reply._id === replyId
          ? { ...reply, likes, disLikes, likesRef, disLikesRef }
          : reply
      )
    );
  };

  const handleEditComment = async () => {
    const res = await movieServices.editComment({
      movieId: movieData.data.movieId,
      commentId: data._id,
      content: contentEdit,
      type: 'comment',
    });
    if (res.status) {
      updateComment(data._id, contentEdit);
      setIsEdit(false);
      setContentEdit('');
      showAlert('Sửa bình luận thành công', 'success');
    }
  };

  const MenuListCommentSelf = [
    {
      id: 0,
      content: 'Chỉnh sửa',
      icon: <PencilIcon className="w-4" />,
      action: (data, type, id) => {
        if (type === 'reply') {
          setIdEditReply(id);
        } else {
          setIsEdit(true);
          setContentEdit(data.content);
        }
      },
    },
    {
      id: 1,
      content: 'Xóa',
      icon: <TrashIcon className="w-4" />,
      action: async (data, type, id) => {
        if (type === 'reply') {
          const res = await movieServices.deleteComment({
            commentId: data._id,
            replyId: id,
            type: 'reply',
          });
          if (res.status) {
            deleteReply(id);
          }
        } else {
          const res = await movieServices.deleteComment({
            movieId: movieData.data.movieId,
            commentId: data._id,
            type: 'comment',
          });
          if (res.status) {
            deleteComment(data._id);
          }
        }
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

  const updateReplies = (newReply) => {
    setReplies((prevRelies) => [newReply, ...prevRelies]);
    data.replyCount++;
  };

  const updateReplyContent = (idReplies, newContent) => {
    setReplies((prevReplies) =>
      prevReplies.map((reply) => {
        if (reply._id === idReplies) {
          return { ...reply, content: newContent };
        }
        return reply;
      })
    );
  };

  const deleteReply = (idReplies) => {
    setReplies((prevReplies) =>
      prevReplies.filter((reply) => reply._id !== idReplies)
    );
    data.replyCount--;
  };

  const handelOpenReplies = () => {
    try {
      setOpen(!open);

      const fectchReplies = async () => {
        const res = await movieServices.getReplisByCommentId(data._id);
        setReplies(res.replies);
        setIsLastPage(res.isLastPage);
        console.log(res);
      };

      if (!open) {
        fectchReplies();
      } else {
        setReplies([]);
      }
    } catch (error) {
      showAlert(getErrorMessage(error), 'error');
    }
  };

  const handleLoadComment = async () => {
    page++;
    try {
      const res = await movieServices.getReplisByCommentId(data._id, page);
      setReplies((prevReplies) => [...prevReplies, ...res.replies]);
      setIsLastPage(res.isLastPage);
    } catch (error) {
      showAlert(getErrorMessage(error), 'error');
    }
  };

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
    <div className="mt-2 flex justify-between items-center">
      <div className="flex items-center gap-3 w-full">
        <Avatar
          src={data?.userDetails.avatar || iconUser}
          alt="avatar"
          size="sm"
          className="self-start bg-white"
        />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-center gap-2 self-start">
            <Typography className="text-white font-bold">
              {data?.userDetails.username}
            </Typography>
            <Usersex sex={data?.userDetails.sex}></Usersex>
            <Typography className="text-gray-600 font-normal text-sm">
              {dayjs(data?.time).format('HH:mm - DD/MM/YYYY')}
            </Typography>
            {data.edited && (
              <Typography className="text-gray-600 font-normal text-sm">
                (đã chỉnh sửa)
              </Typography>
            )}
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
                onChange={(e) => setContentEdit(e.target.value)}
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
                  onClick={() => handleEditComment()}
                >
                  Edit
                </Button>
              </div>
            </>
          )}

          <CommentActions
            likes={data?.likes}
            disLikes={data?.disLikes}
            onReply={onReply}
            handleToggleLikeAndDislike={handleToggleLikeAndDislike}
            likesRef={data?.likesRef}
            disLikesRef={data?.disLikesRef}
            userId={userId}
            type={'comment'}
          />

          {replyInput && (
            <ReplyInput
              data={data}
              movieData={movieData}
              updateReplies={updateReplies}
              usernameTag={data.userDetails.username}
              setReplyInput={onReply}
            ></ReplyInput>
          )}
          {data?.replyCount > 0 && (
            <div>
              <Button
                variant="text"
                className="text-primary w-fit normal-case flex items-center gap-2 p-0"
                onClick={handelOpenReplies}
              >
                {!open ? (
                  <ChevronUpIcon className="w-6" />
                ) : (
                  <ChevronDownIcon className="w-6" />
                )}
                <Typography>{data?.replyCount} phản hồi</Typography>
              </Button>
              <Collapse open={open}>
                {replies.map((reply, i) => (
                  <Reply
                    data={data}
                    key={i}
                    reply={reply}
                    movieId={movieData.data.movieId}
                    menuItemsSelf={MenuListCommentSelf}
                    menuItemsAnother={MenuListCommentAnother}
                    handleToggleLikeAndDislike={handleToggleLikeAndDislike}
                    onReplyInput={onReply}
                    updateReplies={updateReplies}
                    idEditReply={idEditReply}
                    updateReplyContent={updateReplyContent}
                  />
                ))}
                {!isLastPage && (
                  <div className="flex justify-center mt-10">
                    <Button
                      className="w-3/4 normal-case text-[14px] flex justify-center"
                      variant="outlined"
                      color="deep-orange"
                      onClick={() => handleLoadComment()}
                    >
                      Tải thêm bình luận
                    </Button>
                  </div>
                )}
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
