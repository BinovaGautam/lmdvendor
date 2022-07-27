import React from 'react';
import { LineWave } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <LineWave color='#1F1D66' height={300} width={300} ariaLabel='three-circles-rotating' />
    </div>
  );
};

export default Loader;
