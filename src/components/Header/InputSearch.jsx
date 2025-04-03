import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { debounce } from 'lodash';

function InputSearch({ isFull = false }) {
  const navigate = useNavigate();

  const [query, seQuery] = useState('');
  const [isShow, SetIsShow] = useState(false);

  const handelHideInput = () => {
    if (!query) {
      SetIsShow(false);
    }
  };

  const handelRemoveText = () => {
    seQuery('');
  };
  // Debounce function để hoãn việc navigate
  const debouncedSearch = debounce((searchQuery) => {
    if (searchQuery.trim() !== '') {
      navigate(`/tim-kiem?query=${encodeURIComponent(searchQuery)}`);
    }
  }, 500);

  useEffect(() => {
    if (query) debouncedSearch(query);
    return () => {
      debouncedSearch.cancel(); // Cleanup debounce khi component unmount
    };
  }, [query]);

  return (
    <div
      className={`cursor-pointer relative ${isFull && 'w-full'}`}
      onClick={() => SetIsShow(true)}
      onBlur={handelHideInput}
    >
      <MagnifyingGlassIcon className="text-white w-6 transition-all hover:text-primary absolute top-2 left-2" />
      <input
        type="text"
        value={query}
        placeholder="Tìm kiếm phim..."
        onChange={(e) => seQuery(e.target.value)}
        className={`${
          isFull ? 'w-full' : isShow ? 'w-80' : 'w-4'
        } h-10 border-spacing-1 bg-gray-700 rounded-md pl-10 text-sm focus:outline-none active:outline-none cursor-pointer transition-all text-white hover:opacity-75 `}
      />

      {isShow && (
        <XMarkIcon
          className="w-6 text-white hover:opacity-80 absolute right-2 top-2"
          onClick={handelRemoveText}
        />
      )}
    </div>
  );
}

export default InputSearch;
