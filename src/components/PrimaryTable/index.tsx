import React from 'react';
import { useSelector } from 'react-redux';
import { PrimaryTableHeadModal, PrimaryTableModel } from '../../models/PrimaryTableModal';
import { RootState } from '../../state/reducers';
import DotsOption from '../DotsOption';
import Loader from '../Loader';
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
                <TableRow key={index} row={row} header={header} actions={actions} />
              ))
            ) : (
              <tr className='h-48'>
                <td colSpan={10} className='text-center text-6xl font-semibold text-gray-400'>
                  No Data
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
}: {
  row: any;
  header: PrimaryTableHeadModal[];
  actions: any;
}) => {
  const { user } = useSelector((state: RootState) => state.userState);
  return (
    <tr className='h-16 border-[1px] border-gray-300'>
      {header.map((head: PrimaryTableHeadModal, index: number) => {
        let tableRow = row;
        if (head.level2) {
          tableRow = tableRow[head.level2.key];
        }
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
                <span>{tableRow[head.key]}</span>
              </div>
            </td>
          );
        }

        if (head.type === 'status') {
          return (
            <td
              key={index}
              className={`text-sm h-full px-4 font-medium ${
                statusColor.red.includes(tableRow[head.key]) && 'text-[#F90C0C]'
              } ${statusColor.green.includes(tableRow[head.key]) && 'text-[#039E00]'} ${
                statusColor.yellow.includes(tableRow[head.key]) && 'text-[#DC8400]'
              } `}>
              {tableRow[head.key]}
            </td>
          );
        }

        if (head.type === 'button') {
          let isQuoted: any = false;
          if (head.disableState) {
            const quotations = row[head.disableState.key];
            isQuoted = head.disableState.isDisable({
              quotations: row[head.disableState.key],
              vendor_id: user?.account_id,
            });
          }

          const btnTitle = (!isQuoted ? head.text : 'Quoted') || '';
          return (
            <td key={index} className='text-sm h-full px-4 text-primary-2 font-medium'>
              <div>
                <PrimaryButton
                  onClick={
                    !isQuoted
                      ? () => {
                          if (head.func) {
                            actions[head.func](row);
                          }
                        }
                      : () => {}
                  }
                  title={btnTitle}
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
              $ {tableRow[head.key]}
            </td>
          );
        }

        return (
          <td key={index} className='text-sm h-full px-4 text-primary-2 font-medium'>
            {tableRow[head.key]}
          </td>
        );
      })}
    </tr>
  );
};
