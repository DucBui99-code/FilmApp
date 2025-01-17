import React, { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";

function InputSearch() {
  const [searchText, setSearchText] = useState("");
  const [isShow, SetIsShow] = useState(false);

  const handelHideInput = () => {
    if (!searchText) {
      SetIsShow(false);
    }
  };

  const handelRemoveText = () => {
    setSearchText("");
  };

  return (
    <div
      className="cursor-pointer relative"
      onClick={() => SetIsShow(true)}
      onBlur={handelHideInput}
    >
      <MagnifyingGlassIcon className="text-white w-6 transition-all hover:text-primary absolute after: left-2 top-2" />
      <input
        type="text"
        value={searchText}
        placeholder="Search Film..."
        onChange={(e) => setSearchText(e.target.value)}
        className={`${
          isShow ? "w-80" : "w-4"
        } h-10 border-spacing-1 bg-gray-500 rounded-md pl-10 text-sm focus:outline-none cursor-pointer transition-all`}
      />

      {isShow && (
        <XMarkIcon
          className="w-6 text-red-400 hover:opacity-80 absolute right-2 top-2"
          onClick={handelRemoveText}
        />
      )}
    </div>
  );
}

export default InputSearch;
