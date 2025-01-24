import {
  Avatar,
  Button,
  IconButton,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React from "react";

function CommentMovie() {
  const limitCharacters = 100;
  return (
    <div className="p-3 flex flex-col items-center justify-center">
      <Typography
        as={"h1"}
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
            <Select color="green" label="Select mode" className="text-white">
              <Option>Mới nhất</Option>
              <Option>Cũ nhất</Option>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full mt-4">
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
            size="xl"
            className="self-start"
          />
          <div className="w-full">
            <div className="relative">
              <Textarea color="white" placeholder="Your Comment" />
              <div className="absolute right-2 bottom-2 text-gray-500 text-sm font-medium flex items-center justify-center gap-1">
                <div>0</div>/<div>{limitCharacters}</div>
              </div>
            </div>
            <div className="flex w-full justify-end py-1.5">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  color="red"
                  variant="text"
                  className="rounded-md"
                >
                  Delete
                </Button>
                <Button size="sm" className="rounded-md bg-primary">
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentMovie;
