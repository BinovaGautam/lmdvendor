import { useState } from 'react';
import AddCommentForm from '../../components/AddCommenForm';
import PrimaryButton from '../../components/PrimaryButton';
import PrimaryTable from '../../components/PrimaryTable';
import QueryForm from '../../components/QueryForm';
import TabBar from '../../components/TabBar';
import { TabMenuModal } from '../../models/TabBarModel';
import { DemoData, TabMenus } from './data';
import { useSelector } from 'react-redux';
import RepairAPI from '../../api/repairApi';
import { useQuery } from 'react-query';
import SendQuotationForm from '../../components/SendQuotationForm';
import ScheduleAppointmentForm from '../../components/ScheduleAppointmentForm';
import { RootState } from '../../state/reducers';
import { toast } from 'react-toastify';
import { ChooseTechnicians } from '../../components';
import RepairDetails from './RepairDetails';

export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.userState);
  const [active, setActive] = useState<TabMenuModal>(TabMenus[0]);
  const [showQueryForm, setShowQueryForm] = useState<boolean>(false);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [showSendQuotationForm, setShowSendQuotationForm] = useState<boolean>(false);
  const [showScheduleAppointmentForm, setScheduleAppointmentForm] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [currRow, setCurrRow] = useState<any>(undefined);
  const [currentQuotation, setCurrentQuotation] = useState<any>(undefined);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const repairRequestListApi = useQuery(
    ['repairRequestList', active.id + 1],
    async () => await RepairAPI.getRepairRequests(active.id + 1),
    {
      onSuccess: (response: any) => {
        if (response.data) {
          setData(response.data.data);
        }
      },
      onError: (error: any) => {
        toast.error('Something went wrong!');
      },
    }
  );

  const onTabChange = async (item: TabMenuModal) => {
    setData([]);
    setActive(item);
  };

  const actions = [
    {
      onClickButton: (row: any) => {
        setCurrRow(row);
        setShowSendQuotationForm(true);
      },
      onQuery: (row: any) => {
        setCurrRow(row);
        setShowQueryForm(true);
      },
    },
    {
      onClickButton: (row: any) => {
        setCurrRow(row);
        setScheduleAppointmentForm(true);
      },
    },
    {
      onAssignTechnician: (row: any) => {
        setCurrRow(row);
        setShowCommentForm(true);
      },
    },
    {
      onClickButton: (row: any) => {
        setCurrRow(row);
        setShowDetails(true);
      },
    },
  ];

  return (
    <div className='h-full flex flex-col gap-y-5 pb-5'>
      {/* ----------------: Header :------------------- */}
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl text-primary-2'>Repair Request</h2>
        <div className='flex items-center gap-x-4'>
          <PrimaryButton
            title={'Repair Request'}
            classNames={`py-2 px-5 font-medium bg-primary-2 border-[1px] border-primary-2 text-white ${
              showDetails && 'text-primary-2 bg-white'
            } `}
            onClick={() => setShowDetails(false)}
          />
          <PrimaryButton
            title={'Preventive Maintenance'}
            classNames={'py-2 px-5 font-medium border-[1px] border-primary-2 text-primary-2'}
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      </div>
      {currRow && showDetails ? (
        <RepairDetails row={currRow} />
      ) : (
        <>
          {/* ----------------: TabBar :------------------- */}
          <div>
            <TabBar menus={TabMenus} active={active} setActive={onTabChange} />
          </div>
          {/* ----------------: TabBarBody :--------------- */}
          <div>
            <PrimaryTable
              header={active?.header || []}
              data={data || []}
              type={`${active?.id}`}
              classNames={''}
              level={0}
              actions={actions[active.id]}
              loading={repairRequestListApi.isLoading || false}
            />
            {/* <p>hello here we go :{JSON.stringify(active?.header)} </p> */}
            <QueryForm row={currRow} show={showQueryForm} setShow={setShowQueryForm} />
            {/* <AddCommentForm show={showCommentForm} setShow={setShowCommentForm} /> */}
            <ChooseTechnicians row={currRow} show={showCommentForm} setShow={setShowCommentForm} />
            <SendQuotationForm
              row={currRow}
              show={!showCommentForm && showSendQuotationForm}
              setShow={setShowSendQuotationForm}
              setShowCommentForm={setShowCommentForm}
            />
            <ScheduleAppointmentForm
              show={showScheduleAppointmentForm}
              setShow={setScheduleAppointmentForm}
              row={currRow}
            />
          </div>
        </>
      )}
    </div>
  );
}
