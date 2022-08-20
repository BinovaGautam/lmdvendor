import { useState } from 'react';
import { ScheduleAppointmentForm } from '../../../component-without-logic';
import { PrimaryButton } from '../../../components';
import { IDateTimeSlotFields } from '../../../components/type';
import { ISendSchedule } from '../type';
import { format } from 'date-fns';
import { IdateTimeSlot } from '../../../api/types';
import { useMutation, useQueryClient } from 'react-query';
import PreventiveAPI from '../../../api/preventiveApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/reducers';

const PreventiveSendSchedule = ({ row }: ISendSchedule) => {
  // -----------------------: REDUX STATE :---------------------
  const { user } = useSelector((state: RootState) => state.userState);

  // initialize react-query client
  const queryClient = useQueryClient();
  const [show, setShow] = useState<boolean>(false);
  const [dateTimeSlot, setDateTimeSlot] = useState<IDateTimeSlotFields[]>([
    { date: undefined, time: undefined },
  ]);
  const [scheduleSubmitErrors, setScheduleSubmitErrors] = useState<{ [key: string]: string[] }>({});
  const [dtSlots, setDtSlot] = useState<IdateTimeSlot[]>([]);

  // mutations
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, mutateAsync } = useMutation(
    'preventiveScheduleAppoinment',
    PreventiveAPI.sendSchedule,
    {
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
        queryClient.invalidateQueries('getPreventiveRequest');
      },
      onError: (error: any) => {
        console.log({ error });
        toast.error('Something went wrong!');
      },
    }
  );

  // utility functions for schedule
  const onScheduleChange = (index: number, name: string, value: Date | undefined) => {
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

  const onScheduleSubmit = async () => {
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

        const time = format(dtSlot.time, 'HH:mm:ss');
        const date = format(dtSlot.date, 'yyyy-MM-dd');

        return { date, time };
      }
    );

    if (!errorFlag) {
      let date_time_slots = dtSlots;
      let created_by = user?.account_id || '';
      let company = row.company;
      let vehicle = row.vehicle.id;

      await mutateAsync({
        date_time_slots,
        vehicle,
        created_by,
        company,
      });
      return;
    }

    setScheduleSubmitErrors(errors);
    setTimeout(() => setScheduleSubmitErrors({}), 3000);
  };

  console.log({ row });

  return (
    <div>
      <PrimaryButton
        onClick={() => {
          setShow(true);
        }}
        title={'Send Schedule'}
        classNames='w-32 py-[6px] bg-none border-[1px] border-primary-2 text-primary-2'
      />
      <ScheduleAppointmentForm
        show={show}
        setShow={setShow}
        dateTimeSlot={dateTimeSlot}
        setDateTimeSlot={setDateTimeSlot}
        onChange={onScheduleChange}
        submitErrors={scheduleSubmitErrors}
        removeField={removeField}
        onSubmit={onScheduleSubmit}
        isLoading={false}
      />
    </div>
  );
};

export default PreventiveSendSchedule;
