import { XIcon } from '@heroicons/react/solid';
import React from 'react';
import { PrimaryButton } from '../../components';
import DatePicker from '../../components/DatePicker';
import ModalForm from '../../components/ModalForm';
import OverlayContainer from '../../components/OverlayContainer';
import TimePicker from '../../components/TimePicker';
import { IDateTimeSlotFields } from '../../components/type';

type Props = {
  show: boolean;
  setShow: (value: boolean) => void;
  dateTimeSlot: IDateTimeSlotFields[];
  setDateTimeSlot: (value: IDateTimeSlotFields[]) => void;
  onChange: (index: number, type: string, value: any) => void;
  submitErrors: { [key: string]: string[] };
  removeField: (index: number) => void;
  onSubmit: () => void;
  isLoading: boolean;
};

const ScheduleAppointmentForm = ({
  show,
  setShow,
  dateTimeSlot,
  onChange,
  submitErrors,
  removeField,
  onSubmit,
  isLoading,
  setDateTimeSlot,
}: Props) => {
  return (
    <OverlayContainer show={show}>
      <ModalForm title={'Schedule Appointment'} onClose={() => setShow(false)}>
        <div className='flex flex-col gap-y-6'>
          {dateTimeSlot.map((dateTime: IDateTimeSlotFields, index: number) => (
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
          ))}

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
            loading={isLoading}
          />
        </div>
      </ModalForm>
    </OverlayContainer>
  );
};

export default ScheduleAppointmentForm;
