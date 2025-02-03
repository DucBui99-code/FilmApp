import { UserCircleIcon } from '@heroicons/react/16/solid';
import React, { useState } from 'react';
import InputSearch from './InputSearch';
import { IconButton } from '@material-tailwind/react';
import Register from '../auth/Register';
import Login from '../auth/Login';

function ActionBarPC() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handelSwitchModal = () => {
    setOpenLogin((prev) => !prev);
    setOpenRegister((prev) => !prev);
  };
  return (
    <div className={`hidden lg:flex items-center justify-center gap-5`}>
      <div className="flex items-center justify-center gap-4">
        <InputSearch></InputSearch>
      </div>
      <div>
        <IconButton>
          <UserCircleIcon
            className="text-white w-8 hover:text-primary transition-all cursor-pointer"
            onClick={() => setOpenLogin(true)}
          ></UserCircleIcon>
        </IconButton>
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
