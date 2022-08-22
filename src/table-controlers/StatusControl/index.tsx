import React from 'react';
import { IStatusControl } from '../type';

const repairRequestStatus = [
  { key: 'created', title: 'Created' },
  { key: 'accepted', title: 'Accepted' },
  { key: 'scheduled', title: 'Scheduled' },
  { key: 'technician_assigned', title: 'Assigned' },
  { key: 'accept_technician', title: 'Accepted' },
  { key: 'reject_technician', title: 'Denied' },
  { key: 'completed_technician', title: 'Completed' },
  { key: 'completed_by_submitted_vendor', title: 'Completed by vendor' },
  { key: 'payment_done_by_dsp', title: 'Paid by dsp' },
  { key: 'payment_done_approved_by_vendor', title: 'Paid by vendor' },
];

const preventiveRequestStatus = [
  { key: 'scheduled_by_vendor', title: 'Scheduled' },
  { key: 'technician_assigned', title: 'Assigned' },
  { key: 'accepted_by_technician', title: 'Accepted' },
  { key: 'rejected_by_technician', title: 'Rejected' },
  { key: 'completed_by_technician', title: 'Completed' },
  { key: 'submitted_by_vendor', title: 'Submitted by Vendor' },
  { key: 'accepted_by_dsp', title: 'Accepted' },
];

const statusColor: { [key: string]: any } = {
  red: [
    // repair request
    'reject_technician',
    // preventive request
    'rejected_by_technician',
  ],
  green: [
    // repair request
    'accepted',
    'accept_technician',
    'completed_technician',
    'completed_by_submitted_vendor',
    'payment_done_by_dsp',
    'payment_done_approved_by_vendor',
    // preventive request
    'accepted_by_technician',
    'completed_by_technician',
    'submitted_by_vendor',
    'accepted_by_dsp',
  ],
  yellow: [
    // repair request
    'created',
    'scheduled',
    'scheduled_by_vendor',
    'technician_assigned',
    // preventive request
    'scheduled_by_vendor',
    'technician_assigned',
    '',
  ],
  blue: ['not_found'],
};

const StatusControl = ({ row, type }: IStatusControl) => {
  const statusValue = type === 'preventive' ? preventiveRequestStatus : repairRequestStatus;
  return (
    <div
      className={`h-full w-full flex items-center ${
        statusColor.red.includes(statusValue[row.status_id - 1]?.key) && 'text-[#F90C0C]'
      } ${statusColor.green.includes(statusValue[row.status_id - 1]?.key) && 'text-[#039E00]'} ${
        statusColor.yellow.includes(statusValue[row.status_id - 1]?.key) && 'text-[#DC8400]'
      } `}>
      {statusValue[row.status_id - 1]?.title}
    </div>
  );
};

export default StatusControl;
