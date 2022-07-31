import React from 'react';
import { InputText } from 'primereact/inputtext';
import { BellIcon, ChatIcon } from '@heroicons/react/solid';
import { Avatar } from 'primereact/avatar';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/reducers';

export default function Header() {
  const { user } = useSelector((state: RootState) => state.userState);

  return (
    <div className='flex flex-row items-center justify-between w-full h-20 border-b-[1px] border-b-gray-primary-1'>
      <div>
        <span className='p-input-icon-left'>
          <i className='pl-2 font-bold text-black pi pi-search' />
          <InputText placeholder='Search' className='pl-12 rounded-full h-12 w-80' />
        </span>
      </div>

      <div className='flex flex-row items-center gap-10 pr-12'>
        <div className='text-base font-bold leading-7 uppercase text-primary-2'>
          <span>SUPPORT:</span>{' '}
          <span>
            <a href={`tel:+91${user?.phone}`} className=''>
              +91-{user?.phone}
            </a>
          </span>
        </div>

        <BellIcon className='w-5 h-5 text-dark-primary' />

        <ChatIcon className='w-5 h-5 text-dark-primary' />

        <div className='flex flex-row items-center gap-3'>
          <Avatar
            label={`${user?.name?.split(' ')[0]?.slice(0, 1)}${user?.name
              ?.split(' ')[1]
              ?.slice(0, 1)}`}
            className=''
            size='large'
          />
          <div className='flex flex-col gap-0 text-sm text-dark-primary'>
            <p className='text-sm font-bold tracking-wider uppercase '>{user?.name}</p>
            <p className=''>{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
