import React, { Fragment } from 'react';
import { PrimaryButtonModel } from '../../models/PrimaryButtonModal';

const PrimaryButton = ({ title, classNames, onClick, type, loading }: PrimaryButtonModel) => {
  return (
    <button
      type={type}
      onClick={() => {
        if (!loading) {
          console.log('clicked');
          onClick();
        }
      }}
      className={`rounded-xl flex items-center justify-center ${
        classNames ? classNames : 'border-none outline-none bg-primary-2 text-white'
      }`}>
      {/* {title} */}
      {loading ? (
        <Fragment>
          <svg
            className='w-5 h-5 mr-3 -ml-1 text-white animate-spin'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              stroke-width='4'></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
          </svg>
          Loading...
        </Fragment>
      ) : (
        title
      )}
    </button>
  );
};

export default PrimaryButton;
