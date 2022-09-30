import React, { Fragment } from 'react';
import { DeleteTechnicianModel } from '../../models/DeleteTechnicianModel';
import ModalForm from '../ModalForm';
import OverlayContainer from '../OverlayContainer';
import PrimaryButton from '../PrimaryButton';

const DeleteTechnician = ({ show, setShow,onPress }: DeleteTechnicianModel) => {
  return (
    <OverlayContainer show={show}>
      <div className='h-full w-full flex items-center justify-center'>
        <div className={`bg-white rounded-xl border-[1px] border-gray-primary-1 w-[470px]`}>
          <div className='px-8 py-7'>
            <div className='flex flex-col gap-y-4 items-center text-primary-2'>
              <h3 className='text-2xl font-semibold text-center'>
                Are you sure you want to delete this technician{' '}
              </h3>
              <p className='text-md text-center'>
                It is a long established fact that a reader will be readable.
              </p>
              <div className='w-full flex justify-between gap-x-4 items-center'>
                <PrimaryButton
                  title={'Cancel'}
                  classNames={
                    'w-full font-semibold border-2 border-primary-2 text-primary-2 py-3 hover:bg-gray-200'
                  }
                  onClick={() => setShow(false)}
                />
                <PrimaryButton
                  title={'Delete'}
                  classNames={
                    'w-full font-semibold bg-primary-2 text-white py-3 hover:bg-[#1f1d66c7]'
                  }
                  onClick={onPress}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </OverlayContainer>
  );
};

export default DeleteTechnician;
