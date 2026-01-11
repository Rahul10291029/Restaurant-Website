import React from 'react';

const Triangle = ({ position, isVisible }) => {
  return (
    <div
      className={`w-0 h-0 border-l-[20px] border-r-[20px] border-l-transparent border-r-transparent mx-auto 
        transition-all duration-700 ease-out 
        ${
          position === 'top'
            ? `border-b-[20px] ${
                isVisible ? 'border-b-yellow-500 opacity-100' : 'border-b-yellow-300 opacity-0'
              }`
            : `border-t-[20px] ${
                isVisible ? 'border-t-yellow-500 opacity-100' : 'border-t-yellow-300 opacity-0'
              }`
        }`}
    ></div>
  );
};

export default Triangle;
