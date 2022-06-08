import React from 'react';
import { InputText } from 'primereact/inputtext';
import { BellIcon, ChatIcon } from '@heroicons/react/solid';
import { Avatar } from 'primereact/avatar';

export default function Header() {
  return (
    <div className='flex flex-row items-center justify-between w-full h-20'>
      <div>
        <span className='p-input-icon-left'>
          <i className='pl-2 font-bold text-black pi pi-search' />
          <InputText placeholder='Search' className='pl-12 rounded-3xl w-80' />
        </span>
      </div>

      <div className='flex flex-row items-center gap-10 pr-12'>
        <div className='text-base font-bold leading-7 tracking-wider uppercase text-dark-primary'>
          <span>SUPPORT:</span>{' '}
          <span>
            <a href='tel:+919560576642' className=''>
              (956) 057 6642
            </a>
          </span>
        </div>

        <BellIcon className='w-5 h-5 text-dark-primary' />

        <ChatIcon className='w-5 h-5 text-dark-primary' />

        <div className='flex flex-row items-center gap-3'>
          <Avatar label='VK' className='' size='large' />
          <div className='flex flex-col gap-0 text-sm text-dark-primary'>
            <p className='text-sm font-bold tracking-wider uppercase '>VIVEK KUMAR</p>
            <p className=''>Lorem, ipsum.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
