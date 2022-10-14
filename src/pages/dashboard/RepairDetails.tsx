import { Fragment, useEffect, useState } from 'react';
import WhiteBoxWithShadow from '../../components/Wrappers/WhiteBoxWithShadow';
import { handleImageOnError } from '../../utils/helpers';
import { PlayIcon } from '@heroicons/react/solid';
import PrimaryButton from '../../components/PrimaryButton';
import FinalAmountInvoiceForm from '../../components/FinalyAmountInvoiceForm';
import { TabMenuModal } from '../../models/TabBarModel';
import FinalAmountForm from '../../components/FinalAmountForm';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import RepairAPI from '../../api/repairApi';
import { toast } from 'react-toastify';
import { UpdateStatus } from '../../api/types';
import QuotationAPI from '../../api/quotationApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/reducers';
import { StatusControl } from '../../table-controlers';
import { AssetsController } from '../../controllers';
import { useGroupAssets } from '../../hooks';
import { IAsset, IAssetObj } from '../../type';
import { format } from 'date-fns';
import UpdateQuotationController from '../../controllers/UpdateQuotationController';

type Props = {
  row?: any;
  setRepairDetail: (value: boolean) => void;
  active: TabMenuModal;
  type: string;
  onSubmit?: (row: any) => void;
  submitLoader?: boolean;
};

interface ITab {
  title: string;
  key: string;
}

const tabs: ITab[] = [
  { title: 'Before', key: 'before' },
  { title: 'After', key: 'after' },
];

export default function RepairDetails({
  row,
  setRepairDetail,
  active,
  type,
  onSubmit,
  submitLoader,
}: Props) {
  // ----------------------: Hooks :------------------------
  const { images, videos, text_notes, additional_items } = useGroupAssets(row.assets);

  const { user } = useSelector((state: RootState) => state.userState);
  const queryClient = useQueryClient();
  let { appointments, technicians } = row || {};
  let technician = technicians ? technicians[0] : {};
  const [activeTab, setActiveTab] = useState<ITab>(tabs[0]);
  const [queries, setQueries] = useState<any[]>([]);
  const [showFinalAmountInvoiceForm, setShowFinalAmountInvoiceForm] = useState<boolean>(false);
  const [showFinalAmountForm, setShowFinalAmountForm] = useState<boolean>(false);
  const [quotations, setQuotations] = useState<any[]>([]);

  const fetchQueries = row && row.quotations;

  const getQueriesList = useQuery(
    ['getQueries', row?.id],
    async () =>
      await QuotationAPI.getQueries(row.id, row.quotations[0].id, user?.account_id as string),
    {
      onSuccess: (response: any) => {
        if (response.data) {
          setQueries(response.data.data);
        }
      },
      onError: (error: Error) => {
        console.log(error);
        toast.error('Something went wrong please reload this page!');
      },
      enabled: !!fetchQueries,
    }
  );

  const MUpdateStatus = useMutation('updateStatus', RepairAPI.updateStatus, {
    onSuccess: (response: any) => {
      if (response.response) {
        toast.error(response.response.data.message);
        return;
      }

      toast.success('Update successfully!');
      queryClient.invalidateQueries('allRpairRequest');

      setRepairDetail(false);
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error('something went wrong!!');
    },
  });

  const finish = () => {
    setShowFinalAmountInvoiceForm(false);
    setShowFinalAmountForm(false);
    setRepairDetail(false);
  };

  const onComplete = () => {
    const data: UpdateStatus = {
      status_id: 9,
      request_id: row?.id as number,
    };

    console.log(data);
    MUpdateStatus.mutate(data);
  };

  useEffect(() => {
    setQuotations(row.quotations);
  }, [row]);

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

      {/* <pre className='w-[700px] overflow-scroll text-wrap'>{JSON.stringify(active)}</pre> */}

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
              <div className='flex flex-col'>
                <p className='text-sm'>Estimation Amount</p>
                <h3 className='text-base font-semibold'>
                  $
                  {quotations?.length > 0 &&
                    quotations[quotations?.length - 1]?.estimations[
                      quotations[0]?.estimations.length - 1
                    ].amount
                  }
                </h3>
              </div>
              <div className='flex flex-col'>
                {row.status_id !== '9' && <UpdateQuotationController row={row} />}
              </div>
            </div>
            <div className='flex flex-col p-5 gap-y-2'>
              <h3 className='text-base font-semibold'>Queries</h3>
              {queries.length ? (
                <div className='bg-[#DADDEB] p-3 rounded-xl max-h-40 overflow-y-scroll flex flex-col gap-y-4'>
                  {queries.map((query: any) => (
                    <Fragment>
                      <p
                        className={`text-sm font-medium bg-gray-200 shadow-md max-h-44 p-2 rounded-xl text-primary-2 w-max ${
                          query.sender_type === 'Vendor' && 'self-end text-right'
                        }`}>
                        {query.query}
                      </p>
                    </Fragment>
                  ))}
                </div>
              ) : null}
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
                <h3 className='text-base font-semibold'>{technician?.technician_account_id}</h3>
              </div>
            </div>
            <div></div>
          </div>
        </WhiteBoxWithShadow>
      </div>

      {/* ---------------------------: TABS :------------------------ */}
      <div>
        <div className='w-max'>
          <WhiteBoxWithShadow classNames=''>
            <div className=''>
              <div className='flex gap-x-6 px-8 py-[2px]'>
                {tabs.map((tab: ITab, index: number) => (
                  <div
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 text-base transition-all duration-300 delay-200 font-semibold text-primary-2 py-3 cursor-pointer relative after:content-[''] after:absolute after:rounded-full after:top-full after:transition-all after:duration-300 after:delay-200 after:left-0 after:h-[2px] after:w-full after:bg-[#3880ff] ${
                      activeTab.key !== tab.key ? 'after:opacity-0 text-opacity-50' : ''
                    }`}>
                    {tab.title}
                  </div>
                ))}
              </div>
            </div>
          </WhiteBoxWithShadow>
        </div>
      </div>

      {/* ----------------------------: IMAGES :-------------------- */}
      <WhiteBoxWithShadow classNames=''>
        <div className='text-primary-2'>
          <div className='p-5 flex flex-col gap-y-3'>
            <h3 className='font-semibold text-sm'>Photos</h3>
            <div className='flex gap-5 flex-wrap'>
              {/* ASSETS CONTROLLER */}
              {images[activeTab.key as keyof IAssetObj].map((image: IAsset, index: number) => (
                <AssetsController {...image} key={index} />
              ))}
            </div>
          </div>
          <div className='p-5 flex flex-col gap-y-3'>
            <h3 className='font-semibold text-sm'>Video</h3>
            <div className='flex gap-5 flex-wrap'>
              {videos[activeTab.key as keyof IAssetObj].map((video: IAsset, index: number) => (
                <AssetsController {...video} key={index} />
              ))}
            </div>
          </div>
          <div className='p-5 flex flex-col gap-y-3'>
            <h3 className='font-semibold text-sm'>Notes</h3>
            {text_notes[activeTab.key as keyof IAssetObj].map((note: IAsset, index: number) => (
              <AssetsController {...note} key={index} />
            ))}
          </div>
          <div className='p-5 flex flex-col gap-y-3'>
            <h3 className='font-semibold text-sm'>Add Additional item </h3>
            <div className='flex gap-5 flex-wrap'>
              {additional_items[activeTab.key as keyof IAssetObj].map(
                (item: IAsset, index: number) => (
                  <AssetsController {...item} key={index} />
                )
              )}
            </div>
          </div>
          <div className='p-5 flex flex-col gap-y-3'>
            <h3 className='font-semibold text-sm'>Status</h3>
            {/* {active.key === 'inProgress' && (
              <div>
                {row?.status_id === '6' ? (
                  <span className='text-red-600 flex items-center gap-x-2 text-base font-medium'>
                    <p>Rejected</p>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                ) : (
                  <span className='text-yellow-600 flex items-center gap-x-2 text-base font-medium'>
                    <p>
                      {row?.status_id === '4' && 'Assigned'}

                      {row?.status_id === '5' && 'Accepted'}
                    </p>
                  </span>
                )}
              </div>
            )} */}

            <StatusControl row={row} type={type} />
            {/* {active.key === 'completed' && (
              <span className='text-green-600 text-base font-medium'>
                {row?.status_id === '7' && 'Completed By Technician'}
                {row?.status_id === '8' && 'Completed By Vendor'}
                {row?.status_id === '9' && 'Payment done by DSP'}
              </span>
            )} */}
          </div>
        </div>
      </WhiteBoxWithShadow>

      {type === 'preventive' ? (
        <div className='flex justify-end items-center'>
          {parseInt(row.status_id) >= 4 && (
            <PrimaryButton
              title={'Submit'}
              classNames={'py-2 px-10 bg-primary-2 text-white font-semibold'}
              onClick={() => {
                if (onSubmit) {
                  onSubmit(row);
                }
              }}
              loading={submitLoader}
            />
          )}
        </div>
      ) : (
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
              onClick={onComplete}
              loading={MUpdateStatus.isLoading}
            />
          )}
        </div>
      )}

      <FinalAmountInvoiceForm
        row={row}
        show={showFinalAmountInvoiceForm}
        setShow={setShowFinalAmountInvoiceForm}
        finish={() => finish()}
      />
      {/* <FinalAmountForm
        row={row}
        show={showFinalAmountForm}
        setShow={setShowFinalAmountForm}
        finish={() => finish()}
      /> */}
    </div>
  );
}
