import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import RepairAPI from '../../api/repairApi';
import { FinalAmountInvoiceFormModel } from '../../models/FinalAmountInvoiceFormModel';
import { RootState } from '../../state/reducers';
import ModalForm from '../ModalForm';
import OverlayContainer from '../OverlayContainer';
import PrimaryButton from '../PrimaryButton';

const FinalAmountForm = ({ show, setShow, row, finish }: FinalAmountInvoiceFormModel) => {
  const { user } = useSelector((state: RootState) => state.userState);
  const [finalAmount, setFinalAmount] = useState<string>('');
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const sendFinalAmount = useMutation('sendFinalAmount', RepairAPI.sendPayment, {
    onSuccess: (response: any) => {
      if (response.response) {
        toast.error(response.response.data.message);
        return;
      }

      toast.success('Paid Successfully!');
      setFinalAmount('');
      finish();
      queryClient.invalidateQueries(['allRpairRequest']);
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error('Something went wrong');
    },
  });

  const onSend = () => {
    let errors: string[] = [];
    // =========================== validate data =======================

    if (!finalAmount) errors.push('finalAmount');

    if (!errors.length) {
      const data = {
        repair_request_id: row.id as string,
        payment_type: finalAmount,
        payment_notes: 'payment done',
      };

      // sendFinalAmount.mutate(data);
      return;
    }

    setSubmitErrors(errors);
    setTimeout(() => setSubmitErrors([]), 3000);
  };

  return (
    <OverlayContainer show={show}>
      <ModalForm title={'Send Final Amount'} onClose={() => setShow(false)}>
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

          <PrimaryButton
            title={'Send'}
            classNames={'font-semibold w-full bg-primary-2 text-white py-3'}
            onClick={onSend}
            // loading={sendFinalAmount.isLoading}
            // onClick={() => {}}
          />
        </div>
      </ModalForm>
    </OverlayContainer>
  );
};

export default FinalAmountForm;
