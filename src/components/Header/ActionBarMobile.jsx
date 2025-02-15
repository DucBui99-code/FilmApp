import React from 'react';
import InputSearch from './InputSearch';
import AuthControls from './AuthControls';

function ActionBarMobile() {
  return (
    <div className="items-center justify-center gap-5">
      <div className="flex items-center justify-center flex-col mt-6">
        <InputSearch isFull={true} />
      </div>
      <AuthControls isMobile={true} />
    </div>
  );
}

export default ActionBarMobile;
