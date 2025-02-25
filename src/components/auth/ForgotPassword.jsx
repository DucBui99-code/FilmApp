import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Typography,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAlert } from '../Message/AlertContext';
import { XMarkIcon } from '@heroicons/react/16/solid';
import AuthServices from '../../services/authServices';
import getErrorMessage from '../../utils/handelMessageError';

function ForgotPassword({ handelOpen, open }) {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { showAlert } = useAlert();

  const [loading, setLoading] = useState(false);

  const handelClose = () => {
    reset();
    handelOpen(!open);
  };
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await AuthServices.forgotPassword(data);

      showAlert(res.message, 'success');

      handelClose();
    } catch (error) {
      showAlert(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Dialog size="xs" open={open} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[24rem] bg-black text-white">
          <CardBody className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h4" color="white">
                Quên mật khẩu
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
              Gửi
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default ForgotPassword;
