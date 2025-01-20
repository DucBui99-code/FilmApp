import React, { useState } from "react";
import InputSearch from "./InputSearch";
import { Button } from "@material-tailwind/react";
import Register from "../auth/Register";
import Login from "../auth/Login";

function ActionBarMobile() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handelSwitchModal = () => {
    setOpenLogin((prev) => !prev);
    setOpenRegister((prev) => !prev);
  };
  return (
    <div className={`items-center justify-center gap-5`}>
      <div className="flex items-center justify-center flex-col mt-6">
        <InputSearch isFull={true}></InputSearch>
      </div>
      <div className="flex items-center justify-center gap-5 mt-6 border-t-2 p-4 border-gray-700">
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

export default ActionBarMobile;
