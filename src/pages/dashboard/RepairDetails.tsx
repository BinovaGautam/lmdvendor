import { useState } from 'react';
import WhiteBoxWithShadow from '../../components/Wrappers/WhiteBoxWithShadow';
import { handleImageOnError } from '../../utils/helpers';
import { PlayIcon } from '@heroicons/react/solid';
import PrimaryButton from '../../components/PrimaryButton';
import FinalAmountInvoiceForm from '../../components/FinalyAmountInvoiceForm';
import { TabMenuModal } from '../../models/TabBarModel';
import FinalAmountForm from '../../components/FinalAmountForm';

type Props = {
  row?: any;
  setRepairDetail: (value: boolean) => void;
  active: TabMenuModal;
};

const tabs = ['Before', 'After'];

export default function RepairDetails({ row, setRepairDetail, active }: Props) {
  let { appointments, technicians } = row || {};
  let technician = technicians ? technicians[0] : {};
  const [activeTab, setActiveTab] = useState<number>(0);
  const [showFinalAmountInvoiceForm, setShowFinalAmountInvoiceForm] = useState<boolean>(false);
  const [showFinalAmountForm, setShowFinalAmountForm] = useState<boolean>(false);

  const finish = () => {
    setShowFinalAmountInvoiceForm(false);
    setShowFinalAmountForm(false);
    setRepairDetail(false);
  };

  return (
    <div className='flex flex-col gap-y-5 pb-8'>
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

      <pre className='w-[700px] overflow-scroll text-wrap'>{JSON.stringify(active)}</pre>

      <div className='flex flex-col gap-y-2'>
        <h3 className=' font-semibold text-primary-2'>Quotes</h3>

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
      </div>

      <div className='flex flex-col gap-y-2'>
        <h3 className=' font-semibold text-primary-2'>Appointment Date</h3>

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

      <div className='flex flex-col gap-y-2'>
        <h3 className=' font-semibold text-primary-2'>Repair Request Accepted</h3>

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
                <div className='flex flex-col'>
                  <p className='text-sm'>Technician Name</p>
                  <h3 className='text-base font-semibold'>{technician?.name}</h3>
                </div>
              </div>
              <div className='flex flex-col'>
                <p className='text-sm'>Email id</p>
                <h3 className='text-base font-semibold'>{technician?.email}</h3>
              </div>
              <div className='flex flex-col'>
                <p className='text-sm'>Phone Number</p>
                <h3 className='text-base font-semibold'>{technician?.phone}</h3>
              </div>
              <div className='flex flex-col'>
                <p className='text-sm'>Technician ID</p>
                <h3 className='text-base font-semibold'>{technician?.id}</h3>
              </div>
            </div>
            <div></div>
          </div>
        </WhiteBoxWithShadow>
      </div>

      <div>
        <div className='w-max'>
          <WhiteBoxWithShadow classNames=''>
            <div className=''>
              <div className='flex gap-x-6 px-8 py-[2px]'>
                {tabs.map((tab: string, index: number) => (
                  <div
                    onClick={() => setActiveTab(index)}
                    className={`px-4 text-base transition-all duration-300 delay-200 font-semibold text-primary-2 py-3 cursor-pointer relative after:content-[''] after:absolute after:rounded-full after:top-full after:transition-all after:duration-300 after:delay-200 after:left-0 after:h-[2px] after:w-full after:bg-[#3880ff] ${
                      activeTab !== index ? 'after:opacity-0 text-opacity-50' : ''
                    }`}>
                    {tab}
                  </div>
                ))}
              </div>
            </div>
          </WhiteBoxWithShadow>
        </div>
      </div>
      <WhiteBoxWithShadow classNames=''>
        <div className='text-primary-2'>
          <div className='p-5 flex flex-col gap-y-3'>
            <h3 className='font-semibold text-sm'>Photos</h3>
            <div className='flex gap-5 flex-wrap'>
              <div className='h-28 w-40 rounded-xl overflow-hidden'>
                <img src='' alt='' className='w-full h-full' onError={handleImageOnError} />
              </div>
              <div className='h-28 w-40 rounded-xl overflow-hidden'>
                <img src='' alt='' className='w-full h-full' onError={handleImageOnError} />
              </div>
              <div className='h-28 w-40 rounded-xl overflow-hidden'>
                <img src='' alt='' className='w-full h-full' onError={handleImageOnError} />
              </div>
              <div className='h-28 w-40 rounded-xl overflow-hidden'>
                <img src='' alt='' className='w-full h-full' onError={handleImageOnError} />
              </div>
            </div>
          </div>
          <div className='p-5 flex flex-col gap-y-3'>
            <h3 className='font-semibold text-sm'>Video</h3>
            <div className='flex gap-5 flex-wrap'>
              <div className='h-28 w-40 relative rounded-xl overflow-hidden flex items-center justify-center'>
                <img src='' alt='' className='w-full h-full' onError={handleImageOnError} />

                <PlayIcon className='cursor-pointer absolute w-11 h-11 bg-white rounded-full text-primary-2' />
              </div>
              <div className='h-28 w-40 relative rounded-xl overflow-hidden flex items-center justify-center'>
                <img src='' alt='' className='w-full h-full' onError={handleImageOnError} />

                <PlayIcon className='cursor-pointer absolute w-11 h-11 bg-white rounded-full text-primary-2' />
              </div>
              <div className='h-28 w-40 relative rounded-xl overflow-hidden flex items-center justify-center'>
                <img src='' alt='' className='w-full h-full' onError={handleImageOnError} />

                <PlayIcon className='cursor-pointer absolute w-11 h-11 bg-white rounded-full text-primary-2' />
              </div>
              <div className='h-28 w-40 relative rounded-xl overflow-hidden flex items-center justify-center'>
                <img src='' alt='' className='w-full h-full' onError={handleImageOnError} />

                <PlayIcon className='cursor-pointer absolute w-11 h-11 bg-white rounded-full text-primary-2' />
              </div>
            </div>
          </div>
          <div className='p-5 flex flex-col gap-y-3'>
            <h3 className='font-semibold text-sm'>Notes</h3>
            <p className='text-sm'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam neque
              reprehenderit beatae
            </p>
          </div>
          <div className='p-5 flex flex-col gap-y-3'>
            <h3 className='font-semibold text-sm'>Add Additional item </h3>
            <div className='flex gap-5 flex-wrap'>
              <WhiteBoxWithShadow classNames=''>
                <div className='py-3 px-6'>
                  <p>Lorem Ipsum is simply</p>
                </div>
              </WhiteBoxWithShadow>
              <WhiteBoxWithShadow classNames=''>
                <div className='py-3 px-6'>
                  <p>Lorem Ipsum is simply</p>
                </div>
              </WhiteBoxWithShadow>
              <WhiteBoxWithShadow classNames=''>
                <div className='py-3 px-6'>
                  <p>Lorem Ipsum is simply</p>
                </div>
              </WhiteBoxWithShadow>
            </div>
          </div>
          <div className='p-5 flex flex-col gap-y-3'>
            <h3 className='font-semibold text-sm'>Status</h3>
            {active.key === 'inProgress' && (
              <span className='text-yellow-600 text-base font-medium'>In Progress</span>
            )}
            {active.key === 'completed' && (
              <span className='text-green-600 text-base font-medium'>Completed</span>
            )}
          </div>
        </div>
      </WhiteBoxWithShadow>

      <div className='flex justify-end items-center'>
        {active.key === 'inProgress' && (
          <PrimaryButton
            title={'Submit'}
            classNames={'py-2 px-10 bg-primary-2 text-white font-semibold'}
            onClick={() => setShowFinalAmountInvoiceForm(true)}
          />
        )}
        {active.key === 'completed' && (
          <PrimaryButton
            title={'Send final amount'}
            classNames={'py-2 px-10 bg-primary-2 text-white font-semibold'}
            onClick={() => setShowFinalAmountForm(true)}
          />
        )}
      </div>

      <FinalAmountInvoiceForm
        row={row}
        show={showFinalAmountInvoiceForm}
        setShow={setShowFinalAmountInvoiceForm}
        finish={() => finish()}
      />
      <FinalAmountForm
        row={row}
        show={showFinalAmountForm}
        setShow={setShowFinalAmountForm}
        finish={() => finish()}
      />
    </div>
  );
}
