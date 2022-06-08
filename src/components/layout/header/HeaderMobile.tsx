import React from 'react';
import './HeaderMobile.css';

export default function HeaderMobile() {
  return (
    <div className='bg-primary-contrast px-5 py-5'>
      <div className='flex justify-between flex-row items-start'>
        <img
          src='../images/hamburger.svg'
          alt='hamburger menu'
          className='w-5 h-5 object-contain'
        />
        <h2 className='text-xl font-semibold text-white'>Your request</h2>
        <div className='relative z-20'>
          <img
            src='../images/notification.svg'
            alt='notification'
            className='w-5 h-5 object-contain'
          />
          <div className='mobile-notification absolute z-30'>01</div>
        </div>
      </div>
    </div>
  );
}
