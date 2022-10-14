import React, { useState } from 'react';
import { SendQuotationFormModel } from '../../models/SendQuotationFormModel';
import ModalForm from '../ModalForm';
import OverlayContainer from '../OverlayContainer';
import PrimaryButton from '../PrimaryButton';
import SingleFileUploader from '../SingleFIleUploader';
import { TrashIcon } from '@heroicons/react/solid';
import { useMutation, useQueryClient } from 'react-query';
import { CreateQuotation } from '../../api/types';
import QuotationAPI from '../../api/quotationApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/reducers';

const SendQuotationForm = ({
  show,
  setShow,
  row,
  setShowCommentForm,
  setShowScheduleForm,
  getData,
}: SendQuotationFormModel) => {
  const { user } = useSelector((state: RootState) => state.userState);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [workHours, setWorkHours] = useState<string>('');
  const [estimateAmount, setEstimateAmount] = useState<string>('');
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('');

  const queryClient = useQueryClient();

  const createQuotationApi = useMutation(
    'create-quotation',
    async (data: CreateQuotation) => await QuotationAPI.createQuotation(data),
    {
      onSuccess: (response: any) => {
        if (response.response) {
          let { data } = response.response || {};

          if (data) toast.error(data.message);
          return;
        }
        toast.success('Sand Quotation Successfully!');
        setShow(false);
        setFile(undefined);
        setEstimateAmount('');
        setWorkHours('');
        queryClient.invalidateQueries('allRpairRequest');
      },
      onError: (error: any) => {
        console.log({ error });
        toast.error('Something went wrong!');
      },
    }
  );

  const onSubmit = () => {
    let errors: string[] = [];
    // =========================== validate data =======================
    // if (!file) errors.push('file');

    if (!estimateAmount) errors.push('estimateAmount');

    // if (!workHours) errors.push('workHours');

    if (!errors.length) {
      const estimations = [
        {
          amount: estimateAmount,
        },
      ];

      const data = {
        estimations,
        work_hours: workHours,
        quotation: file,
        vendor_account_id: user?.account_id as string,
        request_id: row.id,
      };

      if (getData) {
        getData(data, createQuotationApi.mutateAsync);
        setShowScheduleForm(true);
      } else {
        createQuotationApi.mutate(data);
      }
      return;
    }
    setSubmitErrors(errors);
    setTimeout(() => setSubmitErrors([]), 3000);
  };

  return (
    <OverlayContainer show={show}>
      <ModalForm title={'Send Quote'} onClose={() => setShow(false)}>
        <div className='flex flex-col gap-y-6'>
          <div className='flex items-center justify-between gap-x-6'>
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
            <div className='flex flex-col gap-y-2'>
              <label className='font-semibold text-primary-2' htmlFor='work-hour'>
                Work Hour (optional)
              </label>
              <input
                id='work-hour'
                type='text'
                placeholder='e.g 20'
                onChange={(e) => setWorkHours(e.target.value)}
                className='p-3 w-full border-[2px] border-[#DADDEB] rounded-xl outline-none focus:border-primary-2 text-base text-primary-2 transition-all duration-300'
              />

              {submitErrors.includes('workHours') && (
                <span className='text-sm text-primary-2'>is required</span>
              )}
            </div>
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

          <div className='flex flex-col gap-y-2'>
            <label className='font-semibold text-primary-2' htmlFor='work-hour'>
              Description (optional)
            </label>
            <textarea
              id='work-hour'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='p-3 w-full border-[2px] border-[#DADDEB] rounded-xl outline-none focus:border-primary-2 text-base text-primary-2 transition-all duration-300'
            />

            {submitErrors.includes('description') && (
              <span className='text-sm text-primary-2'>is required</span>
            )}
          </div>
          <div className='flex justify-between items-center gap-x-6'>
            <PrimaryButton
              title={'Add Comment'}
              classNames={
                'border-[1px] border-primary-2 text-primary-2 py-3 w-full font-semibold hover:bg-primary-2 hover:text-white'
              }
              onClick={() => setShowCommentForm(true)}
            />
            <PrimaryButton
              title={'Next'}
              classNames={
                'border-[1px] border-primary-2 bg-primary-2 text-white py-3 w-full font-semibold hover:bg-[#1f1d66c7]'
              }
              onClick={onSubmit}
              loading={createQuotationApi.isLoading}
            />
          </div>
        </div>
      </ModalForm>
    </OverlayContainer>
  );
};

export default SendQuotationForm;
