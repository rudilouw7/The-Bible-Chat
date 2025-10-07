
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-4 h-4 border-2 border-stone-400 border-t-white rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
