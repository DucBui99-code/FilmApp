import { UserCircleIcon } from '@heroicons/react/16/solid';
import React, { useEffect, useState } from 'react';
import InputSearch from './InputSearch';
import { Avatar, Button, IconButton } from '@material-tailwind/react';
import Register from '../auth/Register';
import Login from '../auth/Login';
import { useSelector } from 'react-redux';
import AvatarCustom from './AvatarCustom';
import eventBus from '../../utils/eventBus';
import emitter from '../../utils/eventBus';

function ActionBarPC() {
  const { userInfo } = useSelector((state) => state.auth);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handelSwitchModal = () => {
    setOpenLogin((prev) => !prev);
    setOpenRegister((prev) => !prev);
  };
  useEffect(() => {
    emitter.on('openLogin', () => {
      setOpenLogin((prev) => !prev);
    });
    return () => {
      eventBus.off('openLogin');
    };
  }, []);
  return (
    <div className={`hidden lg:flex items-center justify-center gap-5`}>
      <div className="flex items-center justify-center gap-4">
        <InputSearch></InputSearch>
      </div>
      <div>
        {userInfo ? (
          <AvatarCustom
            src={userInfo?.avatar}
            email={userInfo.email}
          ></AvatarCustom>
        ) : (
          <UserCircleIcon
            className="text-white w-8 hover:text-primary transition-all cursor-pointer"
            onClick={() => setOpenLogin(true)}
          ></UserCircleIcon>
        )}
      </div>
      <Login
        handleOpen={setOpenLogin}
        open={openLogin}
        handelSwitchModal={handelSwitchModal}
      ></Login>
      <Register
        handleOpen={setOpenRegister}
        open={openRegister}
        handelSwitchModal={handelSwitchModal}
      ></Register>
    </div>
  );
}

export default ActionBarPC;
