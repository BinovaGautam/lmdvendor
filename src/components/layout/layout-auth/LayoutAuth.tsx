import { Outlet } from 'react-router-dom';

import './LayoutAuth.css';

export default function LayoutAuth() {
  return (
    <div className='auth-bg flex items-center h-auto lg:h-screen'>
      <div className='w-1/2 h-full lg:block hidden relative'>
        <img src='../images/auth-bg-v1.svg' alt='auth bg' className='w-full object-fill h-screen' />
        <div className='absolute top-0 bottom-0 grid place-content-center w-full h-full text-center'>
          <img className="w-24 h-24" src='../images/vendorlogo.png' alt='fleet logo' />
          <span className='text-white inline-block mt-4'>Fleet Max</span>
        </div>
      </div>
      <div className='w-full lg:w-1/2 mx-auto px-0 lg:px-4 h-full flex items-start lg:items-center justify-center'>
        <div className='max-w-full lg:max-w-xl w-full h-full flex items-center justify-content-start lg:justify-center flex-col lg:pb-0 max-h-screen overflow-y-auto pr-0 lg:pr-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
