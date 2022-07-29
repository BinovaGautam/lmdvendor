import { TrashIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import RepairAPI from '../../api/repairApi';
import { FinalAmountFormModel } from '../../models/FinalAmountFormModel';
import { RootState } from '../../state/reducers';
import ModalForm from '../ModalForm';
import OverlayContainer from '../OverlayContainer';
import PrimaryButton from '../PrimaryButton';
import SingleFileUploader from '../SingleFIleUploader';

const FinalAmountForm = ({ show, setShow, row }: FinalAmountFormModel) => {
  const { user } = useSelector((state: RootState) => state.userState);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [finalAmount, setFinalAmount] = useState<string>('');
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const sendInvoice = useMutation('sendInvoice', RepairAPI.sendInvoice, {
    onSuccess: (response: any) => {
      if (response.response) {
        toast.error(response.response.data.message);
        return;
      }

      toast.success('Invoice Send Successfully!');
      setFinalAmount('');
      setFile(undefined);
      setShow(false);
      queryClient.invalidateQueries('allRpairRequest');
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error('Something went wrong');
    },
  });

  const onSend = () => {
    let errors: string[] = [];
    // =========================== validate data =======================
    if (!file) errors.push('file');

    if (!finalAmount) errors.push('finalAmount');

    if (!errors.length) {
      const data = {
        repair_request_id: row.id as string,
        final_payment: finalAmount,
        final_invoice: file as File,
      };

      sendInvoice.mutate(data);
      return;
    }

    setSubmitErrors(errors);
    setTimeout(() => setSubmitErrors([]), 3000);
  };

  return (
    <OverlayContainer show={show}>
      <ModalForm title={'Final Amount'} onClose={() => setShow(false)}>
        <div className='flex flex-col gap-y-4'>
          <div className='flex flex-col gap-y-2'>
            <label className='font-semibold text-primary-2' htmlFor='amount'>
              Amount
            </label>
            <input
              id='amount'
              type='text'
              value={finalAmount}
              onChange={(e) => setFinalAmount(e.target.value)}
              className='p-3 w-full border-[2px] border-[#DADDEB] rounded-xl outline-none focus:border-primary-2 text-base text-primary-2 transition-all duration-300'
            />
            {submitErrors.includes('finalAmount') && (
              <span className='text-sm text-primary-2'>is required</span>
            )}
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
            {submitErrors.includes('file') && (
              <span className='text-sm text-primary-2'>is required</span>
            )}
          </div>
          <PrimaryButton
            title={'Send'}
            classNames={'font-semibold w-full bg-primary-2 text-white py-3'}
            onClick={onSend}
            loading={sendInvoice.isLoading}
            // onClick={() => {}}
          />
        </div>
      </ModalForm>
    </OverlayContainer>
  );
};

export default FinalAmountForm;
