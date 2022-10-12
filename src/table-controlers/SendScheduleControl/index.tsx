import { ISendScheduleControl } from '../type';
import { PrimaryButton } from '../../components';
import { useState } from 'react';
import { ScheduleAppointmentForm } from '../../components';

const SendScheduleControl = ({ row }: ISendScheduleControl) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      <PrimaryButton
        onClick={() => {
          setShow(true);
        }}
        title={'Send Schedule'}
        classNames='w-32 py-[6px] bg-none border-[1px] border-primary-2 text-primary-2'
      />
      <ScheduleAppointmentForm show={show} setShow={setShow} row={row} />
    </div>
  );
};

export default SendScheduleControl;
