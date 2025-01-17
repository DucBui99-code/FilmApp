import { UserCircleIcon } from "@heroicons/react/16/solid";
import { BellAlertIcon } from "@heroicons/react/16/solid";
import React from "react";
import InputSearch from "./InputSearch";

function ActionBar() {
  return (
    <div className="flex items-center justify-center gap-5">
      <div className="flex items-center justify-center gap-4">
        <BellAlertIcon className="text-white w-6 hover:text-primary cursor-pointer" />
        <button className="bg-primary rounded-md p-2 hover:opacity-85 transition-all">
          Đăng ký gói
        </button>
        <InputSearch></InputSearch>
      </div>
      <div>
        <UserCircleIcon className="text-white w-8 hover:text-primary transition-all cursor-pointer"></UserCircleIcon>
      </div>
    </div>
  );
}

export default ActionBar;
