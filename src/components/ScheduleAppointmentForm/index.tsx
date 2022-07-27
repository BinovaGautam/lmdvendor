import React, { useState } from 'react';
import { ScheduleAppointmentFormModel } from '../../models/ScheduleAppointmentFormModel';
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
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';

interface IDateTimeSlot {
  date: Date | undefined;
  time: Date | undefined;
}

const ScheduleAppointmentForm = ({ show, setShow, row }: ScheduleAppointmentFormModel) => {
  const { user } = useSelector((state: RootState) => state.userState);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [dateTimeSlot, setDateTimeSlot] = useState<IDateTimeSlot[]>([
    { date: undefined, time: undefined },
  ]);
  const [workHours, setWorkHours] = useState<string>('');
  const [estimateAmount, setEstimateAmount] = useState<string>('');
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const createQuotationApi = useMutation(
    'create-quotation',
    async (data: CreateQuotation) => await QuotationAPI.createQuotation(data),
    {
      onSuccess: (response: any) => {
        if (response.response) {
          toast.error(response.response.data.message);
          return;
        }
        toast.success('Sand Quotation Successfully!');
        queryClient.invalidateQueries('repairRequestList');
      },
      onError: (error: any) => {
        console.log({ error });
        toast.error('Something went wrong!');
      },
    }
  );

  const onChange = (index: number, name: string, value: Date | undefined) => {
    let data = [...dateTimeSlot];
    if (name === 'date') data[index].date = value;
    if (name === 'time') data[index].time = value;
    setDateTimeSlot(data);
  };

  const onSubmit = () => {
    let time = dateTimeSlot[0].time;
    if (time) console.log(time.getTime(), time.toLocaleTimeString());
    // console.log({ dateTimeSlot });
    // let errors: string[] = [];
    // =========================== validate data =======================
    // if (!file) errors.push('file');

    // if (!estimateAmount) errors.push('estimateAmount');

    // if (!workHours) errors.push('workHours');

    // if (!errors.length) {
    //   const data = {
    //     estimate_amount: estimateAmount,
    //     work_hour: workHours,
    //     vendor_account_id: user?.account_id,
    //     quotation: file,
    //   };

    //   console.log({ data });
    //   // createQuotationApi.mutate(data);
    // }
    // setSubmitErrors(errors);
    // setTimeout(() => setSubmitErrors([]), 3000);
  };

  return (
    <OverlayContainer show={show}>
      <ModalForm title={'Schedule Appointment'} onClose={() => setShow(false)}>
        <div className='flex flex-col gap-y-6'>
          {dateTimeSlot.map((datetime: IDateTimeSlot, index: number) => {
            return (
              <div className='flex items-center justify-between gap-x-6'>
                <DatePicker
                  value={dateTimeSlot[index].date}
                  setValue={(value) => onChange(index, 'date', value)}
                />
                <TimePicker
                  value={dateTimeSlot[index].time}
                  setValue={(value) => onChange(index, 'time', value)}
                />
              </div>
            );
          })}

          <div
            onClick={() => setDateTimeSlot([...dateTimeSlot, { date: undefined, time: undefined }])}
            className='flex items-center justify-center py-3 rounded-xl  border-[1px] border-[#DADDEB] cursor-pointer'>
            <h3 className='text-base font-semibold text-primary-2'>+ Add Schedule</h3>
          </div>
          <PrimaryButton
            title={'Send'}
            classNames={
              'border-[1px] border-primary-2 bg-primary-2 text-white py-3 w-full font-semibold hover:bg-[#1f1d66c7]'
            }
            onClick={onSubmit}
            loading={createQuotationApi.isLoading}
          />
        </div>
      </ModalForm>
    </OverlayContainer>
  );
};

export default ScheduleAppointmentForm;
