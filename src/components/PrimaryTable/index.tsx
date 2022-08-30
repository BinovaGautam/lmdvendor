import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PrimaryTableHeadModal, PrimaryTableModel } from '../../models/PrimaryTableModal';
import { RootState } from '../../state/reducers';
import DotsOption from '../DotsOption';
import Loader from '../Loader';
import PrimaryButton from '../PrimaryButton';

const handleImageOnError = (e: any) => {
  e.target.src =
    'https://img.freepik.com/free-vector/city-skyline-concept-illustration_114360-8923.jpg?w=2000&t=st=1660910262~exp=1660910862~hmac=54937f31be109281376f996d5e7a7451b14ca2cbfe46eaee0e63df67545d1a62';
};

const statusColor: { [key: string]: any } = {
  red: ['reject_technician'],
  green: [
    'accepted',
    'payment_done_by_dsp',
    'payment_done_approved_by_vendor',
    'payment_done_by_dsp',
  ],
  yellow: ['created', 'scheduled'],
};

const statusValue = [
  { key: 'created', title: 'Created' },
  { key: 'accepted', title: 'Accepted' },
  { key: 'scheduled', title: 'Scheduled' },
  { key: 'technician_assigned', title: 'Technician Assigned' },
  { key: 'accept_technician', title: 'Accepted' },
  { key: 'reject_technician', title: 'Denied' },
  { key: 'completed_technician', title: 'Completed By Tech.' },
  { key: 'completed_by_submitted_vendor', title: 'Completed by vendor' },
  { key: 'payment_done_by_dsp', title: 'Paid by dsp' },
  { key: 'payment_done_approved_by_vendor', title: 'Paid by vendor' },
];

const PrimaryTable = ({
  header,
  classNames,
  level,
  data,
  loading,
  type,
  actions,
  displayMsg,
}: PrimaryTableModel) => {
  return (
    <div
      className={`min-h-[550px] max-h-[550px] pb-5 overflow-y-scroll no-scrollbar rounded-xl bg-white border-[1px] border-gray-300 px-4`}>
      <br />
      <table className='min-w-full'>
        {/* ----------------- Header --------------------- */}
        <thead className='bg-white'>
          <tr className=''>
            {header.map((head: any, index: number) => (
              <th
                key={index}
                scope='col'
                className='pt-5 px-4 pb-3 font-semibold text-primary-2 text-sm text-left bg-white border-b-[1px] border-b-gray-300'>
                {head.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`border-[1px] border-white ${!loading && data.length && 'shadow-md'}`}>
          {loading ? (
            <tr className='h-full'>
              <td colSpan={10} className='text-center text-6xl font-semibold text-gray-400'>
                <Loader />
              </td>
            </tr>
          ) : (
            data &&
            (data.length ? (
              data.map((row: any, index: number) => (
                <TableRow key={index} row={row} header={header} actions={actions} type={type} />
                //  <p>hello</p>
              ))
            ) : (
              <tr className='h-48'>
                <td colSpan={10} className='text-center text-6xl font-semibold text-gray-400'>
                  {displayMsg ? displayMsg : 'No Data'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PrimaryTable;

export const TableRow = ({
  row,
  header,
  actions,
  type,
}: {
  row: any;
  header: PrimaryTableHeadModal[];
  actions: any;
  type: string;
}) => {
  const { user } = useSelector((state: RootState) => state.userState);
  return (
    <tr className='h-16 border-[1px] border-gray-300 hover:bg-gray-100'>
      {header.map((head: PrimaryTableHeadModal, index: number) => {
        let tableRow = row;
        if (head.level2) {
          tableRow = tableRow[head?.level2?.key];
        }

        if (!tableRow)
          return (
            <td
              key={index}
              className='min-h-[150px] py-4 text-sm h-full px-4 text-primary-2 font-bold text-center'>
              ------------
            </td>
          );

        if (head.type === 'image-string') {
          return (
            <td
              key={index}
              className='min-h-[150px] py-4 text-sm h-full px-4 text-primary-2 font-bold'>
              <div className='flex items-center gap-x-3'>
                <div className='flex items-center justify-center rounded-full overflow-hidden h-9 w-9'>
                  <img
                    src=''
                    alt=''
                    className='w-20 h-full rounded-full'
                    onError={handleImageOnError}
                  />
                </div>
                <span>{tableRow?.[head?.key]}</span>
              </div>
            </td>
          );
        }

        if (head.type === 'status') {
          let status_id = parseInt(tableRow[head.key]);

          if (!status_id) return <td className='min-h-[150px] py-4' key={index}></td>;

          return (
            <td
              key={index}
              className={`min-h-[150px] py-4 text-sm h-full px-4 font-medium ${
                statusColor.red.includes(statusValue[status_id - 1]?.key) && 'text-[#F90C0C]'
              } ${
                statusColor.green.includes(statusValue[status_id - 1]?.key) && 'text-[#039E00]'
              } ${
                statusColor.yellow.includes(statusValue[status_id - 1]?.key) && 'text-[#DC8400]'
              } `}>
              {statusValue[status_id - 1]?.title}
            </td>
          );
        }

        if (head.type === 'button') {
          let isQuoted: any = false;
          let btnTitle = head.text || '';
          let btnClick = () => {
            console.log(actions);
            if (head.func) {
              actions[head.func](row);
            }
          };

          if (head.disableState) {
            const quotations = tableRow[head.disableState.key];
            isQuoted = head.disableState.isDisable({
              quotations: tableRow[head.disableState.key] || [],
              vendor_id: user?.account_id,
            });
          }

          if (type === '0' && isQuoted) {
            btnTitle = 'Quoted';

            btnClick = () => {};
          }

          return (
            <td
              key={index}
              className='min-h-[150px] py-4 text-sm h-full px-4 text-primary-2 font-medium'>
              <div>
                <PrimaryButton
                  onClick={btnClick}
                  title={btnTitle}
                  classNames='w-32 py-[6px] bg-none border-[1px] border-primary-2 text-primary-2'
                />
              </div>
            </td>
          );
        }

        if (head.type === 'universal-buttons') {
          return (
            <td
              key={index}
              className='min-h-[150px] py-4 text-sm h-full px-4 text-primary-2 font-medium'>
              <div className='w-full flex items-center justify-start gap-x-3'>
                <PencilAltIcon
                  onClick={() => actions.universal.edit(tableRow)}
                  className='w-6 cursor-pointer text-[#3A70D9]'
                />
                <TrashIcon
                  onClick={() => actions.universal.delete(tableRow)}
                  className='w-6 cursor-pointer text-[#FF5353]'
                />
              </div>
            </td>
          );
        }

        if (head.type === 'dot-option') {
          let showDrop = true;
          // alert(`type ${type} ${tableRow.quotations.length}`);
          if (type === '0' && !tableRow.quotations?.length) {
            // alert('chal kahe nahi rahe ho be');
            showDrop = false;
          }

          return (
            <td
              key={index}
              className='min-h-[150px] py-4 text-sm h-full px-4 text-primary-2 font-medium'>
              <DotsOption
                options={head.options || []}
                row={row}
                actions={actions}
                showDrop={showDrop}
              />
            </td>
          );
        }

        if (head.type === 'amount-level2') {
          tableRow = tableRow[0];

          if (!tableRow) return <td key={index}></td>;

          return (
            <td
              key={index}
              className='min-h-[150px] py-4 text-sm h-full px-4 text-primary-2 font-medium'>
              {tableRow[head.key] && '$' + tableRow[head.key]}
            </td>
          );
        }

        if (head.type === 'amount') {
          return (
            <td
              key={index}
              className='min-h-[150px] py-4 text-sm h-full px-4 text-primary-2 font-medium'>
              $ {tableRow[head.key]}
            </td>
          );
        }

        if (head.type === 'component') {
          let { component } = head || {};
          if (component) {
            return (
              <td
                key={index}
                className='min-h-[150px] py-4 text-sm h-full px-4 text-primary-2 font-medium'>
                {component(row)}
              </td>
            );
          } else return null;
        }

        return (
          <td
            key={index}
            className='min-h-[150px] py-4 max-w-[200] text-sm h-full px-4 text-primary-2 font-medium'>
            {tableRow[head.key]}
          </td>
        );
      })}
    </tr>
  );
};
