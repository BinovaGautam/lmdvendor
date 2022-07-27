import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { TimePickerModel } from '../../models/TimePickerModel';

const TimePicker = ({ value, setValue }: TimePickerModel) => {
  return (
    <div className='flex flex-col gap-y-[3px]'>
      <label className='font-semibold text-primary-2' htmlFor='time12'>
        Time
      </label>
      <Calendar
        id='time12'
        value={value}
        onChange={(e) => setValue(e.value as Date)}
        timeOnly
        hourFormat='12'
      />

      {/* {submitErrors.includes('estimateAmount') && (
        <span className='text-sm text-primary-2'>is required</span>
      )} */}
    </div>
  );
};

export default TimePicker;
