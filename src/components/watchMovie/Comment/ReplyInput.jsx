import React, { useState } from 'react';
import { Avatar, Button, Input } from '@material-tailwind/react';

import iconUser from '../../../assets/225-default-avatar.png';
import movieServices from '../../../services/movieServices';

const ReplyInput = ({
  data,
  movieData,
  usernameTag,
  updateReplies,
  setReplyInput,
}) => {
  const limitCharacters = 100;
  const { userInfo } = useSelector((state) => state.auth);
  const [text, setText] = useState('');
  const [isShowAction, setIsShowAction] = useState(false);
  const [paddingInput, setPaddingInput] = useState('0px');
  const spanRef = useRef(null);
  const replyComment = async () => {
    const bodyData = {
      movieId: movieData.data.movieId,
      content: text,
      type: 'reply', //Type có 2 loai bao gồm: comment hoặc reply
      commentId: data._id, // Dùng để reply comment
    };
    const res = await movieServices.postComment(bodyData);
    updateReplies(data._id, res.data);
    setIsShowAction(false);
    setReplyInput();
    setText('');
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

  useEffect(() => {
    if (spanRef.current) {
      setPaddingInput(spanRef.current.offsetWidth + 4 + 'px');
    }
  }, [isShowAction]);

  return (
    <div className="w-full flex gap-2 mb-2">
      <Avatar
        src={userInfo?.avatar.url || iconUser}
        alt="avatar"
        size="sm"
        className="mt-2 bg-white"
      />
      <div className="w-full self-start">
        <div className="relative">
          <span
            ref={spanRef}
            className="absolute top-[36%] left-0 bg-gray-800 px-[4px] text-white rounded-md text-sm"
          >
            {usernameTag}
          </span>
          <Input
            placeholder="Your Comment..."
            value={text}
            variant="static"
            className="text-white leading-none"
            color="green"
            style={{ paddingLeft: paddingInput }}
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
                Hủy bỏ
              </Button>
              <Button
                size="sm"
                className="rounded-md bg-primary"
                disabled={text.length <= 0 || text.length > limitCharacters}
                onClick={() => replyComment()}
              >
                Bình luận
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReplyInput;
