import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Dialog,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import IconGG from "../../assets/IconGG.png";
import IconQR from "../../assets/IconQR.png";

function Login({ handleOpen, open, handelSwitchModal }) {
  const [showPass, setShowPass] = useState(false);

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={() => handleOpen(!open)}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem] bg-black text-white">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="white">
              Đăng Nhập
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Email
            </Typography>
            <Input label="Email" size="lg" color="white" />
            <Typography className="-mb-2" variant="h6">
              Password
            </Typography>
            <Input
              label="Password"
              size="lg"
              color="white"
              type={showPass ? "text" : "password"}
              icon={
                showPass ? (
                  <EyeSlashIcon
                    className="cursor-pointer"
                    color="white"
                    onClick={() => setShowPass(!showPass)}
                  />
                ) : (
                  <EyeIcon
                    className="cursor-pointer"
                    color="white"
                    onClick={() => setShowPass(!showPass)}
                  />
                )
              }
            />
            <div className="flex items-center justify-between -ml-2">
              <Checkbox label="Nhớ tài khoản" color="green" />
              <Typography
                className="cursor-pointer hover:text-primary transition-colors"
                variant="small"
              >
                Quên mật khẩu?
              </Typography>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              color="green"
              onClick={handleOpen}
              fullWidth
            >
              Đăng nhập
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Chưa có tài khoản?
              <Typography
                variant="small"
                color="green"
                className="ml-1 font-bold cursor-pointer"
                onClick={handelSwitchModal}
              >
                Đăng ký
              </Typography>
            </Typography>

            <div className="flex items-center mt-3">
              <div className="flex-grow border-t border-gray-500"></div>
              <span className="px-4 text-gray-500 text-sm">
                hoặc kết nối tài khoản
              </span>
              <div className="flex-grow border-t border-gray-500"></div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-3">
              <IconButton>
                <img src={IconGG} alt="GG Icon" className="w-6"></img>
              </IconButton>
              <IconButton>
                <img src={IconQR} alt="QR Icon" className="w-6"></img>
              </IconButton>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default Login;
