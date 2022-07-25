import React from 'react';
import { ModalFormModel } from '../../models/ModalFormModel';
import { XIcon } from '@heroicons/react/solid';

const ModalForm = ({ children, title, onClose }: ModalFormModel) => {
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <div className='bg-white rounded-xl w-[470px] border-[1px] border-gray-primary-1'>
        <div className='text-primary-2 text-md font-bold flex items-center justify-between px-6 py-5 border-b-[1px] border-b-gray-primary-1'>
          <h2 className=''>{title}</h2>
          <div
            onClick={onClose}
            className='border-[2px] rounded-md p-1 border-primary-2 cursor-pointer'>
            <XIcon className='h-4 w-4' />
          </div>
        </div>
        <div className='px-6 py-5'>{children}</div>
      </div>
    </div>
  );
};

export default ModalForm;
