import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";

function Register({ handleOpen, open, handelSwitchModal }) {
  const [showPass, setShowPass] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const handelChangeOpen = () => {
    handleOpen(!open);
    setOpenLogin(true);
  };
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
            <Typography variant="h4" className="mb-4" color="white">
              Đăng Ký
            </Typography>

            <Input label="Email" size="lg" color="white" />

            <Input
              label="Mật khẩu"
              size="lg"
              color="white"
              type={showPass ? "text" : "password"}
              icon={
                showPass ? (
                  <EyeSlashIcon
                    className="cursor-pointer text-white"
                    onClick={() => setShowPass(!showPass)}
                  />
                ) : (
                  <EyeIcon
                    className="cursor-pointer text-white"
                    onClick={() => setShowPass(!showPass)}
                  />
                )
              }
            />
            <Input
              label="Nhập lại mật khẩu"
              size="lg"
              color="white"
              type={showPass ? "text" : "password"}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              color="green"
              onClick={handleOpen}
              fullWidth
            >
              Đăng ký
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Bạn đã có tài khoản?
              <Typography
                variant="small"
                color="green"
                className="ml-1 font-bold cursor-pointer"
                onClick={handelSwitchModal}
              >
                Đăng nhập
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default Register;
