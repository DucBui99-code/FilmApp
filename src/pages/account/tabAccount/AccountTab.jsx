import React, { useEffect, useRef, useState } from 'react';
import { UserIcon } from '@heroicons/react/24/solid';
import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import SaveIcon from '@mui/icons-material/Save';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import UserServices from '../../../services/userServices';
import { TYPE_LOGIN } from '../../../config/constant';
import { useAlert } from '../../../components/Message/AlertContext';

const AccountTab = ({ data }) => {
  const { loginType } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [avatar, setAvatar] = useState(null);
  const [file, setFile] = useState(null); // Lưu file để cập nhật lại
  const [loading, setLoading] = useState(false);
  const [showChangeButton, setShowChangeButton] = useState(false);

  const { showAlert } = useAlert();

  useEffect(() => {
    if (data) {
      setAvatar(data?.avatar?.url);
      setValue('firstName', data.firstName);
      setValue('username', data.username);
      setValue('lastName', data.lastName);
      setValue('birthDay', dayjs(data.birthDay));
      setValue('phoneNumber', data.phoneNumber);
      setValue('sex', data.sex);
    }
  }, [data]);

  useEffect(() => {
    return () => {
      setAvatar(null);
      setFile(null);
    };
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Cập nhật file mới
      setShowChangeButton(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Handel Upload Avatar
  const uploadAvatar = async () => {
    const formData = new FormData();
    formData.append('avatar', file);

    setLoading(true);
    try {
      const res = await UserServices.uploadAvatar(formData);
      showAlert(res.message, 'success');
    } catch (error) {
      showAlert(error.response?.data?.message.join(', '), 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handel Update Information
  const onSubmit = async (dataSubmit) => {
    setLoading(true);
    if (loginType === TYPE_LOGIN.byGoogle) {
      delete dataSubmit.firstName;
      delete dataSubmit.lastName;
    }

    const handelDate = dayjs(dataSubmit.birthDay).format('MM/DD/YYYY');
    dataSubmit.birthDay = handelDate;

    [
      'phoneNumber',
      'username',
      'sex',
      'firstName',
      'lastName',
      'birthDay',
    ].forEach((field) => {
      if (
        dataSubmit[field]?.toString().trim() ===
          data[field]?.toString().trim() ||
        !dataSubmit[field]
      ) {
        delete dataSubmit[field];
      } else {
        dataSubmit[field] = dataSubmit[field]?.toString().trim();
      }
    });

    if (Object.keys(dataSubmit).length > 0) {
      try {
        const res = await UserServices.editProfile(dataSubmit);
        showAlert(res.message, 'success');
      } catch (error) {
        showAlert(error.response?.data?.message, 'error');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      showAlert('Không có thay đổi nào để cập nhật', 'warning');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-4">
      <div className="col-span-1 mb-4">
        <Card className="bg-[#232323] h-[380px] flex justify-center items-center">
          <div
            className="relative w-[130px] h-[130px] flex items-center justify-center rounded-full p-4 
      bg-[#757575] border-[#343638] border-8 hover:cursor-pointer hover:opacity-80 duration-200 
      after:content-[''] after:absolute after:inset-[-10px] after:border after:border-[#757575] after:rounded-full after:border-dashed"
            onClick={() => document.getElementById('avatarInput').click()}
          >
            {avatar ? (
              <img
                src={avatar}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover rounded-full"
                key={file ? file.name : 'default'} // Thay đổi key để force render lại
              />
            ) : (
              <UserIcon color="black" />
            )}
            <input
              type="file"
              id="avatarInput"
              accept="image/jpeg, image/png, image/gif, image/jpg"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <p className="font-bold text-[12px] w-3/4 text-center text-[#919EAB] mt-2">
            Cho phép *.jpeg, *.jpg, *.png, *.gif <br /> Kích thước tối đa 2 MB
          </p>
          {showChangeButton && (
            <Button
              className="bg-primary float-right mt-[30px] flex items-center text-[12px] p-3"
              type="submit"
              disabled={loginType === TYPE_LOGIN.byGoogle || loading}
              loading={loading}
              onClick={uploadAvatar}
            >
              Thay đổi
            </Button>
          )}
        </Card>
      </div>
      <div className="col-span-3 bg-black">
        <div className="text-white font-bold border-t px-[20px] pt-[10px]">
          <p className="py-[8px] mb-[10px]">Thông tin cá nhân</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <Input
                label="Họ"
                autoComplete="off"
                color="light-green"
                className="text-white disabled:bg-opacity-15"
                {...register('firstName')}
                error={!!errors.firstLastName}
                disabled={loginType === TYPE_LOGIN.byGoogle}
              />
              {errors.firstLastName && (
                <Typography variant="small" color="red" className="mt-2">
                  {errors.firstLastName.message}
                </Typography>
              )}
            </div>

            <div>
              <Input
                label="Tên"
                autoComplete="off"
                color="light-green"
                className="text-white disabled:bg-opacity-15"
                {...register('lastName')}
                disabled={loginType === TYPE_LOGIN.byGoogle}
                error={!!errors.lastName}
              />
              {errors.lastName && (
                <Typography variant="small" color="red" className="mt-2">
                  {errors.lastName.message}
                </Typography>
              )}
            </div>

            <div className="col-span-1 md:col-span-2">
              <Input
                label="Username"
                autoComplete="off"
                color="light-green"
                className="text-white disabled:bg-opacity-15"
                {...register('username')}
                error={!!errors.username}
              />
              {errors.username && (
                <Typography variant="small" color="red" className="mt-2">
                  {errors.username.message}
                </Typography>
              )}
            </div>

            <div className="col-span-1 md:col-span-2">
              <Input
                label="Số điện thoại"
                autoComplete="off"
                color="light-green"
                className="text-white disabled:bg-opacity-15"
                {...register('phoneNumber', {
                  pattern: {
                    value: /^(0[3|5|7|8|9])([0-9]{8})$/,
                    message: 'Số điện thoại không hợp lệ',
                  },
                })}
                error={!!errors.phoneNumber}
              />
              {errors.phoneNumber && (
                <Typography variant="small" color="red" className="mt-2">
                  {errors.phoneNumber.message}
                </Typography>
              )}
            </div>

            <div className="col-span-1 md:col-span-2 custom-information">
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="vi"
              >
                <Controller
                  name="birthDay"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value && dayjs(value).isValid()
                        ? true
                        : 'Ngày không hợp lệ',
                  }}
                  render={({ field }) => (
                    <DatePicker
                      format="DD/MM/YYYY" // Định dạng ngày theo mong muốn
                      className="date-picker-css w-full"
                      label="Ngày sinh"
                      {...field}
                      views={['year', 'month', 'day']}
                      value={field.value || null} // Đảm bảo không lỗi khi chưa chọn ngày
                      onChange={(newValue) => field.onChange(newValue)}
                    />
                  )}
                />
              </LocalizationProvider>
              {errors.birthDay && (
                <Typography variant="small" color="red" className="mt-2">
                  {errors.birthDay.message}
                </Typography>
              )}
            </div>

            <div className="col-span-1 md:col-span-2">
              <Controller
                name="sex"
                control={control}
                render={({ field }) => (
                  <Select
                    color="light-green"
                    className="text-white"
                    {...field}
                    label="Giới tính"
                    onChange={(value) => field.onChange(value)}
                  >
                    <Option value="Male">Nam</Option>
                    <Option value="Female">Nữ</Option>
                    <Option value="Other">Không tiết lộ</Option>
                  </Select>
                )}
              />
              {errors.sex && (
                <Typography variant="small" color="red" className="mt-2">
                  {errors.sex.message}
                </Typography>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button
            className="bg-primary float-right mt-[30px] mr-[20px] flex items-center text-[12px] p-3"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading}
          >
            <SaveIcon fontSize="small" className="mr-[4px]" />
            Hoàn tất
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountTab;
