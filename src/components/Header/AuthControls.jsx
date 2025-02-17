import React, { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/16/solid';
import { Button } from '@material-tailwind/react';
import Register from '../auth/Register';
import Login from '../auth/Login';
import AvatarCustom from './AvatarCustom';
import ForgotPassword from '../auth/ForgotPassword';
import { useSelector } from 'react-redux';

function AuthControls({ isMobile }) {
  const { userInfo } = useSelector((state) => state.auth);

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openForgotPass, setOpenForgotPass] = useState(false);

  const handelSwitchModal = () => {
    setOpenLogin((prev) => !prev);
    setOpenRegister((prev) => !prev);
  };

  return (
    <div
      className={`flex ${isMobile ? 'flex-col gap-5 mt-6 border-t-2 p-4 border-gray-700' : 'items-center gap-4'}`}
    >
      {userInfo ? (
        <AvatarCustom src={userInfo?.avatar} email={userInfo?.email} />
      ) : isMobile ? (
        <div className="flex justify-center items-center gap-2">
          <Button
            className="bg-primary hover:opacity-60 transition-opacity w-1/2"
            onClick={() => setOpenLogin(true)}
          >
            Đăng nhập
          </Button>
          <Button
            className="bg-orange-300 hover:opacity-60 transition-opacity w-1/2"
            onClick={() => setOpenRegister(true)}
          >
            Đăng ký
          </Button>
        </div>
      ) : (
        <UserCircleIcon
          className="text-white w-8 hover:text-primary transition-all cursor-pointer"
          onClick={() => setOpenLogin(true)}
        />
      )}

      {/* Modals */}
      <Login
        handleOpen={setOpenLogin}
        open={openLogin}
        handelSwitchModal={handelSwitchModal}
        handelOpenForgotPass={setOpenForgotPass}
      />
      <Register
        handleOpen={setOpenRegister}
        open={openRegister}
        handelSwitchModal={handelSwitchModal}
      />
      <ForgotPassword open={openForgotPass} handelOpen={setOpenForgotPass} />
    </div>
  );
}

export default AuthControls;
