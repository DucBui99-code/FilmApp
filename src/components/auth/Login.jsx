import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/16/solid';
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
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';

import IconGG from '../../assets/IconGG.png';
import IconQR from '../../assets/IconQR.png';
import AuthServices from '../../services/authServices';
import { useAlert } from '../Message/AlertContext';
import { loginSuccess } from '../../store/authSlice';
import getErrorMessage from '../../utils/handelMessageError';

function Login({ handleOpen, open, handelSwitchModal, handelOpenForgotPass }) {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handelClose = () => {
    reset();
    handleOpen(!open);
  };

  const handelLoginSuccess = (data) => {
    dispatch(
      loginSuccess({
        userId: data.data.userId,
        loginType: data.data.typeLogin,
      })
    );

    showAlert(data.message, 'success');
    handelClose();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await AuthServices.loginAccount(data);
      handelLoginSuccess(res);
    } catch (error) {
      showAlert(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  const onLoginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const resGoogle = await AuthServices.connectGoogleClooud(
          tokenResponse.access_token
        );

        try {
          const resLoginServer = await AuthServices.loginByGoole({
            email: resGoogle.email,
            googleId: resGoogle.sub,
            lastName: resGoogle.given_name,
            firstName: resGoogle.family_name,
            avatar: resGoogle.picture,
            loginType: resGoogle.loginType,
          });

          handelLoginSuccess(resLoginServer);
        } catch (error) {
          showAlert(getErrorMessage(error), 'error');
        }
      } catch (error) {
        showAlert(getErrorMessage(error), 'error');
      }
    },
    onError: () => console.log('Login Failed'),
  });

  return (
    <>
      <Dialog size="xs" open={open} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[24rem] bg-black text-white">
          <CardBody className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h4" color="white">
                Đăng Nhập
              </Typography>
              <XMarkIcon
                className="w-6 h-6 text-white mb-2 hover:cursor-pointer"
                onClick={handelClose}
              ></XMarkIcon>
            </div>

            <Input
              label="Email or Username"
              size="lg"
              color="light-green"
              className="text-white"
              autoComplete="off"
              {...register('identifier', {
                required: 'Email or Username is required',
              })}
            />
            {errors.email && (
              <Typography variant="small" color="red" className="-mt-3">
                {errors.identifier.message}
              </Typography>
            )}

            <Input
              label="Password"
              size="lg"
              color="light-green"
              className="text-white"
              autoComplete="off"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(onSubmit)()}
              type={showPass ? 'text' : 'password'}
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
              {...register('password', {
                required: 'Password is required',
              })}
            />
            {errors.password && (
              <Typography variant="small" color="red" className="-mt-3">
                {errors.password.message}
              </Typography>
            )}
            <div className="flex items-center justify-between -ml-2">
              <Checkbox label="Nhớ tài khoản" color="green" />
              <Typography
                className="cursor-pointer hover:text-primary transition-colors"
                variant="small"
                onClick={handelOpenForgotPass}
              >
                Quên mật khẩu?
              </Typography>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              color="green"
              onClick={handleSubmit(onSubmit)}
              fullWidth
              className="flex items-center justify-center"
              loading={loading}
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
              <IconButton onClick={onLoginGoogle}>
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
