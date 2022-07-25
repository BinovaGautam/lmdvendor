import React from 'react';
import { PrimaryTableHeadModal, PrimaryTableModel } from '../../models/PrimaryTableModal';
import DotsOption from '../DotsOption';
import PrimaryButton from '../PrimaryButton';

const handleImageOnError = (e: any) => {
  e.target.src =
    'https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg?t=st=1658646296~exp=1658646896~hmac=616d9e8593ae4b32c50f53fb77ff8c576b264951c3611960cf6439becdd97152&w=740';
};

const statusColor = {
  red: ['Technician Rejects'],
  green: ['Approved', 'Paid'],
  yellow: ['Pending'],
};

const PrimaryTable = ({
  header,
  classNames,
  level,
  data,
  loading,
  type,
  actions,
}: PrimaryTableModel) => {
  return (
    <div
      className={`h-[550px] pb-5 overflow-y-scroll no-scrollbar rounded-xl bg-white border-[1px] border-gray-300 px-4`}>
      <table className='min-w-full'>
        {/* ----------------- Header --------------------- */}
        <thead className='bg-white'>
          <tr className=''>
            {header.map((head: any) => (
              <th
                key={head.key}
                scope='col'
                className='pt-5 px-4 pb-3 font-semibold text-primary-2 text-sm text-left bg-white border-b-[1px] border-b-gray-300'>
                {head.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='border-[1px] border-white shadow-md'>
          {data &&
            data.map((row: any, index: number) => (
              <TableRow key={index} row={row} header={header} actions={actions} />
            ))}
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
}: {
  row: any;
  header: PrimaryTableHeadModal[];
  actions: any;
}) => {
  return (
    <tr className='h-16 border-[1px] border-gray-300'>
      {header.map((head: PrimaryTableHeadModal, index: number) => {
        if (head.type === 'image-string') {
          return (
            <td key={index} className='text-sm h-full px-4 text-primary-2 font-bold'>
              <div className='flex items-center gap-x-3'>
                <div className='flex items-center justify-center rounded-full overflow-hidden h-9 w-9'>
                  <img
                    src=''
                    alt=''
                    className='w-20 h-full rounded-full'
                    onError={handleImageOnError}
                  />
                </div>
                <span>Marvin McKinney</span>
              </div>
            </td>
          );
        }

        if (head.type === 'status') {
          console.log();
          return (
            <td
              key={index}
              className={`text-sm h-full px-4 font-medium ${
                statusColor.red.includes(row[head.key]) && 'text-[#F90C0C]'
              } ${statusColor.green.includes(row[head.key]) && 'text-[#039E00]'} ${
                statusColor.yellow.includes(row[head.key]) && 'text-[#DC8400]'
              } `}>
              {row[head.key]}
            </td>
          );
        }

        if (head.type === 'button') {
          return (
            <td key={index} className='text-sm h-full px-4 text-primary-2 font-medium'>
              <div>
                <PrimaryButton
                  onClick={() => {
                    if (head.func) {
                      actions[head.func](row);
                    }
                  }}
                  title={head.text || ''}
                  classNames='w-32 py-[6px] bg-none border-[1px] border-primary-2 text-primary-2'
                />
              </div>
            </td>
          );
        }

        if (head.type === 'dot-option') {
          return (
            <td key={index} className='text-sm h-full px-4 text-primary-2 font-medium'>
              <DotsOption options={head.options || []} row={row} actions={actions} />
            </td>
          );
        }

        if (head.type === 'amount') {
          return (
            <td key={index} className='text-sm h-full px-4 text-primary-2 font-medium'>
              $ {row[head.key]}
            </td>
          );
        }

        return (
          <td key={index} className='text-sm h-full px-4 text-primary-2 font-medium'>
            {row[head.key]}
          </td>
        );
      })}
    </tr>
  );
};
