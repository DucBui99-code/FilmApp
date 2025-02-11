import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/16/solid';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Spinner,
  Typography,
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import AuthServices from '../../services/authServices';
import { useAlert } from '../Message/AlertContext';
import EnterOTP from './EnterOTP';

function Register({ handleOpen, open, handelSwitchModal }) {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const minLength = 3;
  const maxLength = 15;

  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [openOTP, setOpenOTP] = useState({
    isOpen: false,
    email: '',
    timeExpriedMinutes: 1,
    userId: '',
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const [showPass, setShowPass] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    delete data.confirmPassword;

    try {
      const registerResponse = await AuthServices.registerAccount(data);
      try {
        const otpResponse = await AuthServices.sendOTP({
          userId: registerResponse.userId,
        });
        setOpenOTP({
          isOpen: true,
          email: data.email,
          timeExpriedMinutes: otpResponse.timeExpired,
          userId: registerResponse.userId,
        });
      } catch (otpError) {
        showAlert(
          otpError.response?.data?.message?.[0] || 'Failed to send OTP',
          'error'
        );
      }
    } catch (registerError) {
      showAlert('Đăng ký thất bại:' + registerError.message,'error')
      if (registerError.response?.status === 409) {
        setError('email', {
          type: 'manual',
          message:
            registerError.response?.data?.message?.[0] ||
            'Email already exists',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handelClose = () => {
    handleOpen(!open);
    reset();
  };

  return (
    <>
      <Dialog size="xs" open={open} className="bg-transparent shadow-none z-10">
        <Card className="mx-auto w-full max-w-[24rem] bg-black text-white">
          <CardBody className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h4" color="white">
                Đăng Ký
              </Typography>
              <XMarkIcon
                className="w-6 h-6 text-white mb-2 hover:cursor-pointer"
                onClick={handelClose}
              ></XMarkIcon>
            </div>
            <Input
              label="Email"
              size="lg"
              color="light-green"
              className="text-white"
              autoComplete="off"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: regex,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <Typography variant="small" color="red" className="-mt-3">
                {errors.email.message}
              </Typography>
            )}
            <Input
              label="Tên tài khoản"
              size="lg"
              color="light-green"
              className="text-white"
              autoComplete="off"
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && (
              <Typography variant="small" color="red" className="-mt-3">
                {errors.username.message}
              </Typography>
            )}
            <Input
              label="Mật khẩu"
              size="lg"
              color="light-green"
              className="text-white"
              autoComplete="off"
              type={showPass ? 'text' : 'password'}
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
              {...register('password', {
                required: 'Password is required',
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
              color="light-green"
              className="text-white"
              type={showPass ? 'text' : 'password'}
              {...register('confirmPassword', {
                validate: (val) => {
                  if (watch('password') != val) {
                    return 'Your passwords do not match';
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
              disabled={loading}
              className="flex items-center justify-center"
            >
              {loading ? <Spinner color="white"></Spinner> : 'Đăng ký'}
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
      <EnterOTP open={openOTP} handleOpen={setOpenOTP}></EnterOTP>
    </>
  );
}

export default Register;
