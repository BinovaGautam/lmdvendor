import { useState } from 'react';
import { ScheduleAppointmentFormModel } from '../../models/ScheduleAppointmentFormModel';
import ModalForm from '../ModalForm';
import OverlayContainer from '../OverlayContainer';
import PrimaryButton from '../PrimaryButton';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/reducers';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
import { formateDates, formateTIme } from '../../utils/date';
import RepairAPI from '../../api/repairShopApi';
import { IdateTimeSlot } from '../../api/types';
import { XIcon } from '@heroicons/react/solid';
import { IDateTimeSlotFields } from '../type';

const ScheduleAppointmentForm = ({ show, setShow, row }: ScheduleAppointmentFormModel) => {
  const { user } = useSelector((state: RootState) => state.userState);
  const [dateTimeSlot, setDateTimeSlot] = useState<IDateTimeSlotFields[]>([
    { date: undefined, time: undefined },
  ]);
  const [submitErrors, setSubmitErrors] = useState<{ [key: string]: string[] }>({});

  const queryClient = useQueryClient();

  const scheduleAppoinmentApi = useMutation('scheduleAppoinment', RepairAPI.scheduleAppoinment, {
    onSuccess: (response: any) => {
      if (response.response) {
        const { data } = response.response || {};
        if (data) {
          toast.error(data.message);
          return;
        }
        toast.error('something went wrong');
        return;
      }
      toast.success('Appoinment scheduled Successfully!');
      setDateTimeSlot([{ date: undefined, time: undefined }]);
      setShow(false);
      queryClient.invalidateQueries('allRpairRequest');
    },
    onError: (error: any) => {
      console.log({ error });
      toast.error('Something went wrong!');
    },
  });

  const onChange = (index: number, name: string, value: Date | undefined) => {
    let data = [...dateTimeSlot];
    if (name === 'date') data[index].date = value;
    if (name === 'time') data[index].time = value;
    setDateTimeSlot(data);
  };

  const removeField = (position: number) => {
    let slots = dateTimeSlot;

    if (slots.length <= 1) return;

    slots = slots.filter((slot: any, index: number) => position !== index);

    setDateTimeSlot(slots);
  };

  const onSubmit = () => {
    let errors: { [key: string]: string[] } = {};
    let errorFlag = false;
    const dtSlots: IdateTimeSlot[] = dateTimeSlot.map(
      (dtSlot: IDateTimeSlotFields, index: number) => {
        if (!errors[`${index}`]) {
          errors[`${index}`] = [];
        }

        if (!dtSlot.date || !dtSlot.time) {
          if (!dtSlot.date) errors[`${index}`].push('date');
          if (!dtSlot.time) errors[`${index}`].push('time');
          errorFlag = true;
          return { date: '', time: '' };
        }

        const time = formateTIme(dtSlot.time as Date);
        const date = formateDates(dtSlot.date as Date);

        return { date, time };
      }
    );

    if (!errorFlag) {
      let date_time_slots = dtSlots;
      let vendor_account_id: string = user?.account_id as string;
      let request_id = row.id;
      scheduleAppoinmentApi.mutate({ request_id, vendor_account_id, date_time_slots });
    }

    setSubmitErrors(errors);
    setTimeout(() => setSubmitErrors({}), 3000);
  };

  return (
    <OverlayContainer show={show}>
      <ModalForm title={'Schedule Appointment'} onClose={() => setShow(false)}>
        <div className='flex flex-col gap-y-6'>
          {dateTimeSlot.map((datetime: IDateTimeSlotFields, index: number) => {
            return (
              <div className='flex items-center justify-between gap-x-6'>
                <div>
                  <DatePicker
                    value={dateTimeSlot[index].date}
                    setValue={(value) => onChange(index, 'date', value)}
                  />
                  {submitErrors[`${index}`]?.includes('date') && (
                    <span className='text-sm text-primary-2'>is required</span>
                  )}
                </div>
                <div>
                  <TimePicker
                    value={dateTimeSlot[index].time}
                    setValue={(value) => onChange(index, 'time', value)}
                  />
                  {submitErrors[`${index}`]?.includes('time') && (
                    <span className='text-sm text-primary-2'>is required</span>
                  )}
                </div>

                {dateTimeSlot.length > 1 && (
                  <XIcon
                    className='h-6 w-6 cursor-pointer text-primary-2'
                    onClick={() => removeField(index)}
                  />
                )}
              </div>
            );
          })}

          <div
            onClick={() => setDateTimeSlot([...dateTimeSlot, { date: undefined, time: undefined }])}
            className='flex items-center justify-center py-3 rounded-xl  border-[1px] border-[#DADDEB] cursor-pointer'>
            <h3 className='text-base font-semibold text-primary-2'>+ Add Schedule</h3>
          </div>
          <PrimaryButton
            title={'Schedule'}
            classNames={
              'border-[1px] border-primary-2 bg-primary-2 text-white py-3 w-full font-semibold hover:bg-[#1f1d66c7]'
            }
            onClick={onSubmit}
            loading={scheduleAppoinmentApi.isLoading}
          />
        </div>
      </ModalForm>
    </OverlayContainer>
  );
};

export default ScheduleAppointmentForm;
