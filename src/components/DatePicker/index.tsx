import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { DatePickerModel } from '../../models/DatePickerModel';

const DatePicker = ({ value, setValue }: DatePickerModel) => {
  return (
    <div className='flex flex-col gap-y-[3px]'>
      <label htmlFor='icon' className='font-semibold text-primary-2'>
        Date
      </label>
      <Calendar
        id='icon'
        value={value}
        onChange={(e) => setValue(e.value as Date)}
        showIcon
        className='rounded-xl'
      />

      {/* {submitErrors.includes('estimateAmount') && (
        <span className='text-sm text-primary-2'>is required</span>
      )} */}
    </div>
  );
};

export default DatePicker;
