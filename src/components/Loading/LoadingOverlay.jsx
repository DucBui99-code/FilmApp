import * as React from 'react';
import { Spinner } from '@material-tailwind/react';

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <Spinner />
    </div>
  );
};

export default LoadingOverlay;
