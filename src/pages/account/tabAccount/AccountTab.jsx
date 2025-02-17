import { UserIcon } from '@heroicons/react/24/solid';
import {
  Button,
  Card,
  Input,
  Option,
  Popover,
  PopoverContent,
  PopoverHandler,
  Select,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { DayPicker } from 'react-day-picker';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const ViewAccount = () => {
  const [avatar, setAvatar] = useState('');
  const [date, setDate] = useState('');
  const [value, setValue] = React.useState(null);

  const chooseFile = async () => {
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const imgUrl = URL.createObjectURL(file);
    console.log('imgUrl: ', imgUrl);
    setAvatar(imgUrl);
  };
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <Card className="bg-[#232323] h-[380px] flex justify-center items-center">
          <div
            className="relative w-[130px] h-[130px] flex items-center justify-center rounded-full p-4 
             bg-[#757575] border-[#343638] border-8 hover:cursor-pointer hover:opacity-80 duration-200 
             after:content-[''] after:absolute after:inset-[-10px] after:border after:border-[#757575] after:rounded-full after:border-dashed"
            onClick={chooseFile}
          >
            {avatar ? (
              <img
                src={avatar}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover rounded-full"
              />
            ) : (
              <UserIcon color="black" />
            )}
          </div>

          <p className="font-bold text-[12px] w-3/4 text-center text-[#919EAB] mt-2">
            Cho phép *.jpeg, *.jpg, *.png, *.gif <br /> Kích thước tối đa 2 MB
          </p>
        </Card>
      </div>
      <div className="col-span-3 bg-black">
        <div className="text-white font-bold border-t px-[20px] pt-[10px]">
          <p className="py-[8px] mb-[10px]">Thông tin cá nhân</p>
          <div className="grid grid-cols-2 gap-8 custom-information">
            <Input label="Họ và tên lót*" className="" />
            <Input label="Tên*" className="duration-0" />
            <div className="col-span-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="date-picker-css w-full"
                  label="Ngày sinh"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </LocalizationProvider>
            </div>
            <div className="col-span-2">
              <Select label="Giới tính">
                <Option>Nam</Option>
                <Option>Nữ</Option>
                <Option>Không tiết lộ</Option>
              </Select>
            </div>
          </div>
        </div>
        <Button className="bg-primary float-right mt-[30px] mr-[20px] flex items-center text-[14px] py-[6px] px-[12px]">
          <SaveIcon fontSize="small" className="mr-[4px]" />
          Hoàn tất
        </Button>
      </div>
    </div>
  );
};
const AccountTab = () => {
  const [formAccount, setFormAccount] = useState();
  return (
    <div>
      <ViewAccount />
    </div>
  );
};

export default AccountTab;
