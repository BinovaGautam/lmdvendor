import React from 'react'
import { RepairRequestModel } from '../../models/RepairRequestModel';
import { PanelWrapper } from '../Wrappers';

type Props = {
  row : RepairRequestModel
}

export default function index({row}: Props) {
  return (
    <PanelWrapper>
      <div className='flex flex-wrap w-full bg-red'>hello {JSON.stringify(Object.keys(row))} </div>
    </PanelWrapper>
  );

}