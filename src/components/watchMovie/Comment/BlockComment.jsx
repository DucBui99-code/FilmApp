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
const BlockComment = ({
  data,
  userId,
  movieData,
  updateComment,
  deleteComment,
  updateReplies,
  updateReaction,
  updateReplyContent,
  deleteReply,
}) => {
  const { showAlert } = useAlert();

  const [open, setOpen] = useState(false);
  const [replyInput, setReplyInput] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idEditReply, setIdEditReply, version] = useReactiveState('');
  const limitCharacters = 100;
  const [contentEdit, setContentEdit] = useState('');
  const handelTextComment = (e) => {
    setContentEdit(e);
  };

  const onReply = () => {
    console.log('a');
    setReplyInput(!replyInput);
  };

  const handleLike = async (type, replyId = null) => {
    const bodyData = {
      movieId: movieData.data.movieId,
      commentId: data._id,
      typeAction: 'like',
      type: type,
      replyId: replyId,
    };
    try {
      const res = await movieServices.toggleReactionComment(bodyData);
      if (res.status) {
        updateReaction(data._id, res.likes, res.disLikes);
      }
    } catch (error) {
      if (error.status === 401) {
        showAlert('Vui lòng đăng nhập để thực hiện thao tác này', 'error');
        return;
      }
    }
  };

  const handleDisLike = async (type = 'comment', replyId = null) => {
    const bodyData = {
      movieId: movieData.data.movieId,
      commentId: data._id,
      typeAction: 'disLike',
      type: type,
      replyId: replyId,
    };
    try {
      const res = await movieServices.toggleReactionComment(bodyData);
      if (res.status) {
        updateReaction(data._id, res.likes, res.disLikes);
      }
    } catch (error) {
      if (error.status === 401) {
        showAlert('Vui lòng đăng nhập để thực hiện thao tác này', 'error');
        return;
      }
    }
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
            movieId: movieData.data.movieId,
            commentId: data._id,
            replyId: id,
            type: 'reply',
          });
          console.log('res: ', res);
          if (res.status) {
            deleteReply(data._id, id);
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
            onReply={() => {
              setReplyInput(!replyInput);
            }}
            handleLike={handleLike}
            handleDisLike={handleDisLike}
            likesRef={data?.likesRef}
            disLikesRef={data?.disLikesRef}
            userId={userId}
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
                    movieId={movieData.data.movieId}
                    menuItemsSelf={MenuListCommentSelf}
                    menuItemsAnother={MenuListCommentAnother}
                    handleLike={handleLike}
                    handleDisLike={handleDisLike}
                    onReplyInput={onReply}
                    updateReplies={updateReplies}
                    idEditReply={idEditReply}
                    versionEditReply={version}
                    updateReplyContent={updateReplyContent}
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
