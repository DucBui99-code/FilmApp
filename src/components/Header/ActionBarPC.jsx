import React from 'react';
import InputSearch from './InputSearch';
import AuthControls from './AuthControls';

function ActionBarPC() {
  return (
    <div className="hidden lg:flex items-center justify-center gap-5">
      <InputSearch />
      <AuthControls isMobile={false} />
    </div>
  );
}

export default ActionBarPC;
