import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Spinner,
  Typography,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { useAlert } from '../components/Message/AlertContext';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';

import checkSuccess from '../assets/checkSucess.png';
import AuthServices from '../services/authServices';

function ResetPassoword() {
  const minLength = 3;
  const maxLength = 15;

  const { code } = useParams();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { showAlert } = useAlert();

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    delete data.confirmPassword;
    data.token = code;
    try {
      const res = await AuthServices.resetPassword(data);
      showAlert(res.message, 'success');
      setIsComplete(true);
    } catch (error) {
      showAlert(
        error.response?.data?.message?.[0] || 'Something wrong in server',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };
  return isComplete ? (
    <div className="flex flex-col items-center justify-start w-full h-screen mt-4">
      <img
        src={checkSuccess}
        alt="check success"
        className="w-48 object-contain"
      ></img>
      <Typography variant="h4" className="mt-4 text-white mb-4">
        Thay đổi mật khẩu thành công
      </Typography>
      <a href="/">
        <Button variant="filled" className="bg-primary">
          Trang Chủ
        </Button>
      </a>
    </div>
  ) : (
    <div className="flex items-center justify-center w-screen h-screen p-3">
      <Card
        className="mx-auto w-full max-w-[30rem] bg-blue-gray-900 text-white"
        variant="filled"
        shadow={true}
      >
        <CardBody className="flex flex-col gap-4">
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h4" color="white">
              Đặt lại mật khẩu
            </Typography>
          </div>

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
            className="flex items-center justify-center"
            disabled={loading}
            loading={loading}
          >
            Gửi
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ResetPassoword;
