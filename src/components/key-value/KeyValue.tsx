import React from 'react';

export default function KeyValue(props: any) {
  return (
    <div className='flex flex-col gap-[2px] text-dark-primary-3'>
      <div className='text-sm font-medium leading-4 '>{props.keyText}</div>
      <div className='text-base font-semibold leading-5'>{props.valueText}</div>
    </div>
  );
}
