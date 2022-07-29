import { TrashIcon } from '@heroicons/react/solid';
import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { FinalAmountFormModel } from '../../models/FinalAmountFormModel';
import { RootState } from '../../state/reducers';
import ModalForm from '../ModalForm';
import OverlayContainer from '../OverlayContainer';
import PrimaryButton from '../PrimaryButton';
import SingleFileUploader from '../SingleFIleUploader';

const FinalAmountForm = ({ show, setShow }: FinalAmountFormModel) => {
  const { user } = useSelector((state: RootState) => state.userState);
  const [file, setFile] = useState<File | undefined>(undefined);

  return (
    <OverlayContainer show={show}>
      <ModalForm title={'Final Amount'} onClose={() => setShow(false)}>
        <div className='flex flex-col gap-y-4'>
          <div className='flex flex-col gap-y-2'>
            <label className='font-semibold text-primary-2' htmlFor='amount'>
              Amount
            </label>
            <input
              id='est-amount'
              type='text'
              // placeholder='e.g 200'
              onChange={(e) => {}}
              className='p-3 w-full border-[2px] border-[#DADDEB] rounded-xl outline-none focus:border-primary-2 text-base text-primary-2 transition-all duration-300'
            />
          </div>
          <div className='flex flex-col gap-y-[3px] mb-2'>
            <label className='font-semibold text-primary-2' htmlFor='file'>
              Invoice
            </label>
            {file ? (
              <div className='cursor-pointer flex items-center justify-between'>
                <h3 className='text-base font-medium tracking-wide text-primary-2'>{file?.name}</h3>
                <TrashIcon className='h-5 w-5 text-red-500' onClick={() => setFile(undefined)} />
              </div>
            ) : (
              <SingleFileUploader file={file} setFile={setFile} />
            )}
          </div>
          <PrimaryButton
            title={'Send'}
            classNames={'font-semibold w-full bg-primary-2 text-white py-3'}
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      </ModalForm>
    </OverlayContainer>
  );
};

export default FinalAmountForm;
