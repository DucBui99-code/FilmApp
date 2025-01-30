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
import { useForm } from "react-hook-form";

function Register({ handleOpen, open, handelSwitchModal }) {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const minLength = 3;
  const maxLength = 15;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPass, setShowPass] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
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

            <Input
              label="Email"
              size="lg"
              color="white"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: regex,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <Typography variant="small" color="red" className="-mt-3">
                {errors.email.message}
              </Typography>
            )}
            <Input
              label="Username"
              size="lg"
              color="white"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <Typography variant="small" color="red" className="-mt-3">
                {errors.username.message}
              </Typography>
            )}
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: minLength,
                  message: `Password must be greater than ${minLength} characters`,
                },
                maxLength: {
                  value: maxLength,
                  message: `Password must be less than ${maxLength} characters`,
                },
              })}
            />
            {errors.password && (
              <Typography variant="small" color="red" className="-mt-3">
                {errors.password.message}
              </Typography>
            )}
            <Input
              label="Nhập lại mật khẩu"
              size="lg"
              color="white"
              type={showPass ? "text" : "password"}
              {...register("confirmPassword", {
                validate: (val) => {
                  if (watch("password") != val) {
                    return "Your passwords do not match";
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <Typography variant="small" color="red" className="-mt-3">
                {errors.confirmPassword.message}
              </Typography>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              color="green"
              onClick={handleSubmit(onSubmit)}
              fullWidth
              type="submit"
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
