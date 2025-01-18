import { UserCircleIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import InputSearch from "./InputSearch";
import NotificationPopup from "./NotificationPopup";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { IconButton } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

function ActionBar() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handelSwitchModal = () => {
    setOpenLogin((prev) => !prev);
    setOpenRegister((prev) => !prev);
  };
  return (
    <div className="flex items-center justify-center gap-5">
      <div className="flex items-center justify-center gap-4">
        <NotificationPopup></NotificationPopup>
        <Button className="bg-primary">Đăng ký gói</Button>
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

export default ActionBar;
