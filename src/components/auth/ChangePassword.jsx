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
import {
  MAX_LENGTH_PASSWORD,
  MIN_LENGTH_PASSWORD,
} from '../../config/constant';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

function ChangePassword({ handelOpen, open }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { showAlert } = useAlert();

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handelClose = () => {
    reset();
    handelOpen(!open);
  };
  const onSubmit = async (data) => {
    delete data.confirmPassword;
    setLoading(true);

    try {
      const res = await AuthServices.changePassword(data);
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
                Thay đổi mật khẩu
              </Typography>
              <XMarkIcon
                className="w-6 h-6 text-white mb-2 hover:cursor-pointer"
                onClick={handelClose}
              ></XMarkIcon>
            </div>

            <Input
              label="Mật khẩu hiện tại"
              size="lg"
              color="light-green"
              className="text-white"
              autoComplete="off"
              {...register('currentPassword', {
                required: 'Mật khẩu hiện tại là bắt buộc',
              })}
            />
            {errors.currentPassword && (
              <Typography variant="small" color="red" className="-mt-3">
                {errors.currentPassword.message}
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
                required: 'Mật khẩu là bắt buộc',
                minLength: {
                  value: MIN_LENGTH_PASSWORD,
                  message: `Mật khẩu phải lớn hơn ${MIN_LENGTH_PASSWORD} ký tự`,
                },
                maxLength: {
                  value: MAX_LENGTH_PASSWORD,
                  message: `Mật khẩu phải bé hơn ${MAX_LENGTH_PASSWORD} ký tự`,
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
                    return 'Mật khẩu chưa được trùng';
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
              loading={loading}
              disabled={loading}
            >
              Gửi
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default ChangePassword;
