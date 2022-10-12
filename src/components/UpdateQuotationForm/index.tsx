import { TrashIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { UpdateQuotationFormModel } from '../../models/UpdateQuotationFormModel';
import { RootState } from '../../state/reducers';
import ModalForm from '../ModalForm';
import OverlayContainer from '../OverlayContainer';
import PrimaryButton from '../PrimaryButton';
import SingleFileUploader from '../SingleFIleUploader';

const UpdateQuotationForm = ({ row, show, setShow, getData }: UpdateQuotationFormModel) => {
  const { user } = useSelector((state: RootState) => state.userState);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [workHours, setWorkHours] = useState<string>('');
  const [estimateAmount, setEstimateAmount] = useState<string>('');
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('');

  return (
    <OverlayContainer show={show}>
      <ModalForm title={'Send Quote'} onClose={() => setShow(false)}>
        <div className='flex flex-col gap-y-6'>
          <div className='flex flex-col gap-y-2'>
            <label className='font-semibold text-primary-2' htmlFor='est-amount'>
              Estimate Amount
            </label>
            <input
              id='est-amount'
              type='text'
              placeholder='e.g 200'
              onChange={(e) => setEstimateAmount(e.target.value)}
              className='p-3 w-full border-[2px] border-[#DADDEB] rounded-xl outline-none focus:border-primary-2 text-base text-primary-2 transition-all duration-300'
            />

            {submitErrors.includes('estimateAmount') && (
              <span className='text-sm text-primary-2'>is required</span>
            )}
          </div>

          <div className='flex flex-col gap-y-[3px]'>
            <label className='font-semibold text-primary-2' htmlFor='file'>
              Quotation
            </label>
            {file ? (
              <div className='cursor-pointer flex items-center justify-between'>
                <h3 className='text-base font-medium tracking-wide text-primary-2'>{file?.name}</h3>
                <TrashIcon className='h-5 w-5 text-red-500' onClick={() => setFile(undefined)} />
              </div>
            ) : (
              <SingleFileUploader file={file} setFile={setFile} />
            )}

            {submitErrors.includes('file') && (
              <span className='text-sm text-primary-2'>is required</span>
            )}
          </div>
          <div className='flex items-center justify-center'>
            <h3 className='text-base font-semibold text-primary-2'>Upload Estimated Details</h3>
          </div>

          <div className='flex justify-between items-center gap-x-6'>
            <PrimaryButton
              title={'Update'}
              classNames={
                'border-[1px] border-primary-2 bg-primary-2 text-white py-3 w-full font-semibold hover:bg-[#1f1d66c7]'
              }
              onClick={() => {}}
              loading={false}
            />
          </div>
        </div>
      </ModalForm>
    </OverlayContainer>
  );
};

export default UpdateQuotationForm;
