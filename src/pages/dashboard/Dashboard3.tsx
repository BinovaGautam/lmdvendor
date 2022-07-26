import { useState } from 'react';
import AddCommentForm from '../../components/AddCommenForm';
import PrimaryButton from '../../components/PrimaryButton';
import PrimaryTable from '../../components/PrimaryTable';
import QueryForm from '../../components/QueryForm';
import TabBar from '../../components/TabBar';
import { TabMenuModal } from '../../models/TabBarModel';
import { DemoData, RepairTabMenus } from './data';
import { useSelector } from 'react-redux';
import RepairAPI from '../../api/repairShopApi';
import { useQuery } from 'react-query';
import SendQuotationForm from '../../components/SendQuotationForm';
import ScheduleAppointmentForm from '../../components/ScheduleAppointmentForm';
import { RootState } from '../../state/reducers';
import { toast } from 'react-toastify';
import { ChooseTechnicians } from '../../components';
import RepairDetails from './RepairDetails';
import { Dropdown } from 'primereact/dropdown';

const dropDownData = [
  {
    name: 'Preventive Maintenance',
    code: 'PM',
  },
  {
    name: 'Repair Request',
    code: 'RP',
  },
];

const dropDownData2 = [
  {
    name: 'Onsite',
    code: 'on',
  },
];

export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.userState);
  const [tabMenus, setTabMenus] = useState<TabMenuModal[]>(RepairTabMenus);
  const [active, setActive] = useState<TabMenuModal>(tabMenus[0]);
  const [showQueryForm, setShowQueryForm] = useState<boolean>(false);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [showSendQuotationForm, setShowSendQuotationForm] = useState<boolean>(false);
  const [showScheduleAppointmentForm, setScheduleAppointmentForm] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [allData, setAllData] = useState<{ [key: string]: any[] }>({
    pending: [],
    approved: [],
    scheduled: [],
    inProgress: [],
    completed: [],
    paid: [],
  });
  const [currRow, setCurrRow] = useState<any>(undefined);
  const [currentQuotation, setCurrentQuotation] = useState<any>(undefined);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState<any>(dropDownData[0]);
  const [selectedOption2, setSelectedOption2] = useState<any>(dropDownData2[0]);

  const allRepairRequestApi = useQuery('allRepairRequest', RepairAPI.getAllRepairRequests, {
    onSuccess: (response: any) => {
      if (response.data) {
        let menus = tabMenus;
        let pending = response.data.data.filter((row: any) => row.status_id === '1');
        let approved = response.data.data.filter((row: any) => row.status_id === '2');
        let scheduled = response.data.data.filter((row: any) => row.status_id === '3');
        let inProgress = response.data.data.filter(
          (row: any) =>
            row.status_id === '4' ||
            row.status_id === '5' ||
            row.status_id === '6' ||
            row.status_id === '7'
        );
        let completed = response.data.data.filter((row: any) => row.status_id === '8');
        let paid = response.data.data.filter((row: any) => row.status_id === '9');

        menus[0].title = `Pending (${pending.length})`;
        menus[1].title = `Approved (${approved.length})`;
        menus[2].title = `Scheduled (${scheduled.length})`;
        menus[3].title = `In Progress (${inProgress.length})`;
        menus[4].title = `Completed (${completed.length})`;
        menus[5].title = `Paid (${paid.length})`;

        setAllData({
          pending,
          approved,
          scheduled,
          inProgress,
          completed,
          paid,
        });
      }
    },
  });

  // const repairRequestListApi = useQuery(
  //   ['repairRequestList', active.id + 1],
  //   async () => await RepairAPI.getRepairRequests(active.id + 1),
  //   {
  //     onSuccess: (response: any) => {
  //       if (response.data) {
  //         setData(response.data.data);
  //       }
  //     },
  //     onError: (error: any) => {
  //       toast.error('Something went wrong!');
  //     },
  //   }
  // );

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
    {
      onClickButton: (row: any) => {
        setCurrRow(row);
        setShowDetails(true);
      },
    },
  ];

  // console.log(allData.pending);

  return (
    <div className='h-full flex flex-col gap-y-5 pb-5'>
      {/* ----------------: Header :------------------- */}
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl text-primary-2'>Repair Request</h2>
        <div className='flex items-center gap-x-4'>
          {/* <PrimaryButton
            title={!showDetails ? 'Repair Request' : 'Back'}
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
          /> */}

          <span className='text-primary-2 font-bold tracking-wide'>Filter:</span>

          <Dropdown
            value={selectedOption}
            options={dropDownData}
            onChange={(e: { value: any }) => setSelectedOption(e.value)}
            optionLabel='name'
            className='rounded-xl font-bold text-primary-2 [&>span]:text-primary-2'
          />
          <Dropdown
            value={selectedOption2}
            options={dropDownData2}
            onChange={(e: { value: any }) => setSelectedOption2(e.value)}
            optionLabel='name'
            className='rounded-xl font-semibold text-primary-2 [&>span]:text-primary-2'
          />
        </div>
      </div>
      {currRow && showDetails ? (
        <RepairDetails
          active={active}
          setRepairDetail={setShowDetails}
          row={currRow}
          type='repair'
          onSubmit={function (): void {
            throw new Error('Function not implemented.');
          }}
          submitLoader={false}
        />
      ) : (
        <>
          {/* ----------------: TabBar :------------------- */}
          <div>
            <TabBar menus={RepairTabMenus} active={active} setActive={onTabChange} />
          </div>
          {/* ----------------: TabBarBody :--------------- */}
          <div className='pb-5'>
            <PrimaryTable
              header={active?.header || []}
              data={allData[active.key] || []}
              type={`${active?.id}`}
              classNames={''}
              level={0}
              actions={actions[active.id]}
              loading={allRepairRequestApi.isLoading || false}
            />
            <QueryForm row={currRow} show={showQueryForm} setShow={setShowQueryForm} />
            {/* <AddCommentForm show={showCommentForm} setShow={setShowCommentForm} /> */}
            {showCommentForm && (
              <ChooseTechnicians
                row={currRow}
                show={showCommentForm}
                setShow={setShowCommentForm}
              />
            )}
            <SendQuotationForm
              row={currRow}
              show={!showCommentForm && showSendQuotationForm}
              setShow={setShowSendQuotationForm}
              setShowCommentForm={setShowCommentForm}
              setShowScheduleForm={(value: boolean) => {}}
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
