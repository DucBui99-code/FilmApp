import React, { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/16/solid';

function InputSearch({ isFull = false }) {
  const [searchText, setSearchText] = useState('');
  const [isShow, SetIsShow] = useState(false);

  const handelHideInput = () => {
    if (!searchText) {
      SetIsShow(false);
    }
  };

  const handelRemoveText = () => {
    setSearchText('');
  };

  return (
    <div
      className={`cursor-pointer relative ${isFull && 'w-full'}`}
      onClick={() => SetIsShow(true)}
      onBlur={handelHideInput}
    >
      <MagnifyingGlassIcon className="text-white w-6 transition-all hover:text-primary absolute top-2 left-2" />
      <input
        type="text"
        value={searchText}
        placeholder="Search Film..."
        onChange={(e) => setSearchText(e.target.value)}
        className={`${
          isFull ? 'w-full' : isShow ? 'w-80' : 'w-4'
        } h-10 border-spacing-1 bg-gray-700 rounded-md pl-10 text-sm focus:outline-none active:outline-none cursor-pointer transition-all text-white hover:opacity-75 `}
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
