import React from 'react'
import { RepairRequestModel } from '../../models/RepairRequestModel';
import { handleImageOnError } from '../../utils/helpers';
import { PanelWrapper } from '../Wrappers';

interface RowType extends RepairRequestModel {
  RepairDetails ?: any,
}

type Props = {
  row : RowType
}

export default function index({row}: Props) {
  let { vehicle, notes } = row;
  return (
    <div>
      <PanelWrapper>
        <div className='grid grid-cols-6 w-full bg-red py-2'>
          <img
            src=''
            alt=''
            className='w-14 h-14 rounded-full mx-2  '
            onError={handleImageOnError}
          />
          <p className='text-lg  font-semibold text-primary-2 mb-1 '>{'DSP Admin'}</p>

          <div className='flex ml-4 flex-col justify-center '>
            <p className='text-sm  text-primary-2 '>{'Name'}</p>
            <p className='text-md font-semibold text-primary-2 mb-1'>{vehicle?.name}</p>
          </div>

          <div className='flex ml-4 flex-col justify-center '>
            <p className='text-sm  text-primary-2 '>{'License Plate'}</p>
            <p className='text-md font-semibold text-primary-2 mb-1'>{vehicle?.plate}</p>
          </div>
        </div>
        <hr />
        <div className='flex ml-4 flex-col justify-center mt-2 '>
          <p className='text-sm  text-primary-2 '>{'Notes'}</p>
          <p className='text-md font-semibold text-primary-2 mb-1'>{notes}</p>
        </div>
      </PanelWrapper>

      <p className=' font-semibold text-primary-2 m-2'>Quotes</p>

      <PanelWrapper>
        <div className='grid grid-cols-6 w-full bg-red py-2'>
         
          <div className='flex ml-4 flex-col justify-center '>
            <p className='text-sm  text-primary-2 '>{'Shop Name'}</p>
            <p className='text-md font-semibold text-primary-2 mb-1'>{vehicle?.name}</p>
          </div>

          <div className='flex ml-4 flex-col justify-center '>
            <p className='text-sm  text-primary-2 '>{'Quotation'}</p>
            <p className='text-md font-semibold text-primary-2 mb-1'>{vehicle?.plate}</p>
          </div>
        </div>
        <hr />
        <div className='flex ml-4 flex-col justify-center mt-2 '>
          <p className='text-sm  text-primary-2 '>{'Notes'}</p>
          <p className='text-md font-semibold text-primary-2 mb-1'>{notes}</p>
        </div>
      </PanelWrapper>
    </div>
  );

}