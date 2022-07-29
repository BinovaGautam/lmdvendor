import React from 'react';
import { RepairRequestModel } from '../../models/RepairRequestModel';
import { formateDates } from '../../utils/date';
import { handleImageOnError } from '../../utils/helpers';
import { PanelWrapper } from '../Wrappers';
import WhiteBoxWithShadow from '../Wrappers/WhiteBoxWithShadow';

interface RowType extends RepairRequestModel {
  RepairDetails?: any;
}

type Props = {
  row: any;
};

export default function index({ row }: Props) {
  let { vehicle, notes, appointments } = row;

  return (
    <div className='flex flex-col gap-y-2'>
      <WhiteBoxWithShadow classNames=''>
        <div className='flex flex-col text-primary-2'>
          <div className='flex gap-x-28 items-center border-b-[1px] border-b-table-border-normal p-5'>
            <div className='flex items-center gap-5'>
              <div className='flex items-center justify-center rounded-full overflow-hidden h-9 w-9'>
                <img
                  src=''
                  alt=''
                  className='w-20 h-full rounded-full'
                  onError={handleImageOnError}
                />
              </div>
              <h3 className='text-base font-semibold'>{row?.dsp?.name}</h3>
            </div>
            <div className='flex flex-col'>
              <p className='text-sm'>Van Name</p>
              <h3 className='text-base font-semibold'>{row?.vehicle?.name}</h3>
            </div>
            <div className='flex flex-col'>
              <p className='text-sm'>License Plate</p>
              <h3 className='text-base font-semibold'>{row?.vehicle?.plate}</h3>
            </div>
            <div className='flex flex-col'>
              <p className='text-sm'>Repair Details</p>
              <h3 className='text-base font-semibold'>{row?.damage_id}</h3>
            </div>
          </div>
          <div className='flex flex-col p-5'>
            <span className='text-sm'>Notes</span>
            <p className='text-base font-semibold'>{row?.notes}</p>
          </div>
        </div>
      </WhiteBoxWithShadow>

      <h3 className=' font-semibold text-primary-2 mt-2'>Quotes</h3>

      <WhiteBoxWithShadow classNames=''>
        <div className='flex flex-col text-primary-2'>
          <div className='flex gap-x-28 items-center border-b-[1px] border-b-table-border-normal p-5'>
            <div className='flex flex-col'>
              <p className='text-sm'>Shop Name</p>
              <h3 className='text-base font-semibold'>{row?.vehicle?.name}</h3>
            </div>
            <div className='flex flex-col'>
              <p className='text-sm'>Quotation</p>
              <h3 className='text-base font-semibold'>{row?.vehicle?.plate}</h3>
            </div>
            <div className='flex flex-col'>
              <p className='text-sm'>Address</p>
              <h3 className='text-base font-semibold'>{row?.damage_id}</h3>
            </div>
          </div>
          <div className='flex flex-col p-5 gap-y-2'>
            <h3 className='text-base font-semibold'>Queries</h3>
            <div className='bg-[#DADDEB] p-3 rounded-xl'>
              <p className='text-sm font-medium'>Que. Consectetur adipiscing elit ?</p>
              <p className='text-sm font-medium'>
                Ans. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </WhiteBoxWithShadow>

      <h3 className=' font-semibold text-primary-2 mt-2'>Appointment Date</h3>

      <div className='flex flex-wrap gap-5'>
        {appointments?.map((appointment: any, index: number) => {
          let { date, time } = appointment || {};

          if (date) {
            date = new Date(date).toLocaleDateString();
          }

          return (
            <WhiteBoxWithShadow classNames=''>
              <div className='py-5 px-10 text-primary-2 flex flex-col items-center gap-y-2'>
                <h3 className='text-lg font-semibold tracking-wide'>{date}</h3>
                <span className='text-sm font-medium'>{time}</span>
              </div>
            </WhiteBoxWithShadow>
          );
        })}
      </div>
    </div>
  );
}
