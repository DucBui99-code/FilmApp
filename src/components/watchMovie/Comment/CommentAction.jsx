import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/16/solid';

const CommentActions = ({
  likes,
  disLikes,
  handleLike,
  handleDisLike,
  onReply,
  likesRef,
  disLikesRef,
  userId,
}) => {
  const [liked, setLiked] = useState(false);
  const [disLiked, setDisLiked] = useState(false);
  useEffect(() => {
    console.log(likesRef, disLikesRef, userId);
    if (likesRef && likesRef.some((s) => s === userId)) {
      setLiked(true);
    } else if (disLikesRef && disLikesRef.some((s) => s === userId)) {
      setDisLiked(true);
    }
  }, [likesRef, disLikesRef]);
  return (
    <div className="flex items-center justify-center gap-2 self-start">
      <div className="flex items-center justify-center gap-2 select-none">
        <HandThumbUpIcon
          className={`w-6 cursor-pointer hover:opacity-70 ${liked ? 'text-primary' : 'text-gray-500'}`}
          onClick={() => handleLike('comment')}
        />
        <Typography className="text-gray-600 font-semibold">{likes}</Typography>
      </div>
      <div className="flex items-center justify-center gap-2 select-none">
        <HandThumbDownIcon
          className={`w-6 cursor-pointer hover:opacity-70 ${disLiked ? 'text-primary' : 'text-gray-500'}`}
          onClick={() => handleDisLike('comment')}
        />
        <Typography className="text-gray-600 font-semibold">
          {disLikes}
        </Typography>
      </div>
      <Button
        variant="text"
        className="text-gray-600 font-medium"
        onClick={() => onReply()}
      >
        Phản hồi
      </Button>
    </div>
  );
};

export default CommentActions;
