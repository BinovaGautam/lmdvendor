import React from 'react'
import { json } from 'stream/consumers'
import { AppointmentList, PanelWrapper, RRSummary } from '../../components';

type Props = {
  row ?: any,
}

export default function RepairDetails({row}: Props) {
  let {appointments} = row;
  return (
    <div>
      
      <RRSummary row={row}/>
      <AppointmentList appointments={appointments} />
      {/* <p>appointments :{JSON.stringify(appointments)} </p>
      RepairDetails : {JSON.stringify(row)} */}
    </div>
  );
}