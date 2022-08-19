import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import RepairAPI from '../../api/repairApi';
import { IdateTimeSlot } from '../../api/types';
import AuthAPI from '../../api/usersApi';
import { ScheduleAppointmentForm } from '../../component-without-logic';
import { PrimaryButton } from '../../components';
import { IDateTimeSlotFields } from '../../components/type';
import { formateDates, formateTIme } from '../../utils/date';
import { IDsp, IVehicle } from './type';
import equal from 'fast-deep-equal';
import { format } from 'date-fns';

const CreateRepairRequest = () => {
  // state hooks
  const [data, setData] = useState<object>({});
  const [dspList, setDspList] = useState<IDsp[]>([]);
  const [dsp, setDsp] = useState<IDsp>(dspList[0]);
  const [vehicleList, seVehicleList] = useState<IVehicle[]>([]);
  const [vehicle, setVehicle] = useState<IVehicle>(vehicleList[0]);
  const [note, setNote] = useState<string>('');
  const [esAmount, setEsAmount] = useState<string>('');
  const [submitErrors, setSubmitErrors] = useState<{ [key: string]: string }>({});
  const [dtSlots, setDtSlot] = useState<IdateTimeSlot[]>([]);

  // Schedule appointment state hooks
  const [dateTimeSlot, setDateTimeSlot] = useState<IDateTimeSlotFields[]>([
    { date: undefined, time: undefined },
  ]);
  const [scheduleSubmitErrors, setScheduleSubmitErrors] = useState<{ [key: string]: string[] }>({});

  // useQuery hooks
  const [show, setShow] = useState<boolean>(false);
  const getDspListQuery = useQuery('getDspList', AuthAPI.getRepairShopOwners, {
    onSuccess: (response: any) => {
      // code
      if (response.data) {
        setDspList(response.data.data);
      }
    },
    onError: (error: Error) => {
      console.error(error.message);
      toast.error('Something went wrong..');
    },
  });

  const getVehicleList = useQuery(
    ['getVehicles', dsp?.id],
    async () => await AuthAPI.getVehicles(dsp.id, '10', '0'),
    {
      onSuccess: (response: any) => {
        // code
        if (response.data) {
          seVehicleList(response.data.data);
        }
      },
      onError: (error: Error) => {
        console.error(error.message);
        toast.error('Something went wrong..');
      },
      enabled: !!dsp?.id,
    }
  );

  // some mutations
  const { isLoading, mutateAsync } = useMutation(
    'createRepairRequest',
    RepairAPI.createRepairRequest,
    {
      onSuccess: (response: any) => {
        if (response.response) {
          toast.error(response.response.data.message);
          return;
        }
        toast.success('Request create successfully!');
        setDateTimeSlot([{ date: undefined, time: undefined }]);
        setEsAmount('');
        setNote('');
        const dspList: IDsp[] = [];
        setDsp(dspList[0]);
        const vehicleList: IVehicle[] = [];
        setVehicle(vehicleList[0]);
      },
      onError: (error: Error) => {
        console.error(error);
        toast.error('Something went wrong...');
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

  const onScheduleSubmit = () => {
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

        // const time = formateTIme(dtSlot.time as Date);
        // const date = formateDates(dtSlot.date as Date);

        const time = format(dtSlot.time, 'HH:mm:ss');
        const date = format(dtSlot.date, 'yyyy-MM-dd');

        return { date, time };
      }
    );

    if (!errorFlag) {
      setShow(false);
      console.log({ dtSlots });
      setDtSlot(dtSlots);
      return;
    }

    setScheduleSubmitErrors(errors);
    setTimeout(() => setScheduleSubmitErrors({}), 3000);
  };

  // utility function
  const onSubmit = async () => {
    let errors: { [key: string]: string } = {};

    if (dsp === undefined) errors['dsp'] = 'Dsp is required';
    if (vehicle === undefined) errors['vehicle'] = 'Vehicle is required';
    if (!note) errors['note'] = 'Note is required';

    // this is optional
    // if (!esAmount) errors['esAmount'] = 'Estimate Amount is required';

    if (!equal(errors, {})) {
      setSubmitErrors(errors);
      setTimeout(() => setSubmitErrors({}), 3000);
      return;
    }

    if (dateTimeSlot[0]) {
      if (!dateTimeSlot[0].date || !dateTimeSlot[0].time) {
        toast.error('Click on Schedule button and set schedule');
        return;
      }
    }

    let data = {
      company: `${dsp.id}`,
      vehicle_id: +vehicle.id,
      notes: note,
      date_time_slots: dtSlots,
    };

    await mutateAsync(data);
  };

  return (
    <div className='h-full grid grid-cols-1 gap-y-5 pb-5 place-content-start'>
      <div className='row-between'>
        <h2 className='h2-heading'>Create request</h2>
      </div>
      {/* Form Container */}
      <div className='bg-white w-full rounded-xl border-[1px] border-gray-300 px-6 py-8 flex flex-col gap-y-6'>
        {/* dsp and vehicle field container  */}
        <div className='flex w-full flex-col gap-y-2'>
          <div className='flex justify-between items-center w-full gap-x-6'>
            {/* dsp field */}
            <div className='flex w-full flex-col gap-y-3'>
              <label htmlFor='dsp' className='text-primary-2 font-semibold'>
                Select DSP
              </label>
              <Dropdown
                className='rounded-xl'
                options={dspList}
                onChange={(e: { value: any }) => {
                  setDsp(e.value);
                  const vehicles: IVehicle[] = [];
                  setVehicle(vehicles[0]);
                }}
                optionLabel='company_name'
                name='dsp'
                value={dsp}
              />
            </div>

            {/* vehicle field */}
            <div className='flex w-full flex-col gap-y-3'>
              <label htmlFor='dsp' className='text-primary-2 font-semibold'>
                Select Vehicle
              </label>
              <Dropdown
                className='rounded-xl'
                options={vehicleList}
                onChange={(e: { value: any }) => setVehicle(e.value)}
                optionLabel='name'
                value={vehicle}
              />
            </div>
          </div>
          {/* Errors row */}
          <div className='flex justify-between items-center w-full gap-x-6'>
            <div className='w-full'>
              <p className='text-sm text-primary-2'>{submitErrors?.dsp}</p>
            </div>
            <div className='w-full'>
              <p className='text-sm text-primary-2'>{submitErrors?.vehicle}</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className='flex w-full flex-col gap-y-2'>
          <div className='flex w-full flex-col gap-y-3'>
            <label htmlFor='dsp' className='text-primary-2 font-semibold'>
              Notes
            </label>
            <InputTextarea
              autoResize
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className='rounded-xl'
              rows={5}
              cols={30}
            />
          </div>
          {/* Errors row */}
          <div>
            <p className='text-sm text-primary-2'>{submitErrors?.note}</p>
          </div>
        </div>

        {/* Estimate and Schedule */}
        <div className='flex w-full flex-col gap-y-2'>
          <div className='flex w-full flex-col gap-y-3'>
            <label htmlFor='dsp' className='text-primary-2 font-semibold'>
              Estimate Amount (optional)
            </label>
            <div className='flex justify-between items-center w-full gap-x-6'>
              <InputText
                onChange={(e) => setEsAmount(e.target.value)}
                className='rounded-xl w-full'
                value={esAmount}
              />
              {/* schedule button */}
              <div className={`w-full`}>
                <PrimaryButton
                  title={'Schedule'}
                  classNames={`border-[1px] border-primary-2 py-[.75rem] px-10 text-primary-2 font-medium hover:bg-opacity-80 self-end ${
                    dateTimeSlot[0].date &&
                    dateTimeSlot[0].time &&
                    'bg-green-400 text-white border-green-400'
                  }`}
                  onClick={() => setShow(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-end'>
        {/* Submit Button */}
        <PrimaryButton
          title={'Create request'}
          classNames={
            'border-[1px] border-primary-2 py-[.65rem] px-12 font-medium hover:bg-opacity-80 bg-primary-2 text-white'
          }
          onClick={onSubmit}
          type='submit'
        />
      </div>
      <ScheduleAppointmentForm
        show={show}
        setShow={setShow}
        dateTimeSlot={dateTimeSlot}
        setDateTimeSlot={setDateTimeSlot}
        onChange={onScheduleChange}
        submitErrors={scheduleSubmitErrors}
        removeField={removeField}
        onSubmit={onScheduleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CreateRepairRequest;
