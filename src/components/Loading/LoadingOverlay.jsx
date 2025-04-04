import * as React from 'react';
import './LoadingOverlay.css';

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <span class="loader-private"></span>
    </div>
  );
};

export default LoadingOverlay;
