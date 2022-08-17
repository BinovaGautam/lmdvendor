import React, { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import RepairAPI from '../../api/repairShopApi';
import { ChooseTechnicians } from '../../components';
import AddCommentForm from '../../components/AddCommenForm';
import PrimaryTable from '../../components/PrimaryTable';
import QueryForm from '../../components/QueryForm';
import ScheduleAppointmentForm from '../../components/ScheduleAppointmentForm';
import SendQuotationForm from '../../components/SendQuotationForm';
import TabBar from '../../components/TabBar';
import { TabMenuModal } from '../../models/TabBarModel';
import { RootState } from '../../state/reducers';
import { RepairTabMenus } from './data';
import RepairDetails from './RepairDetails';

type Props = {
  showDetails: boolean;
  setShowDetails: (value: boolean) => void;
};

const RepairRequest = ({ showDetails, setShowDetails }: Props) => {
  // -----------------------: REDUX STATE :---------------------
  const { user } = useSelector((state: RootState) => state.userState);

  // ----------------------: MANAGE STATE :----------------------
  const [currRow, setCurrRow] = useState<any>(undefined);
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

  // ---------------------------: REACT QUERY :----------------------------
  const allRepairRequestApi = useQuery('allRpairRequest', RepairAPI.getAllRepairRequests, {
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

  // ------------------------: UTILITY FUNCTION :-----------------------
  const onTabChange = async (item: TabMenuModal) => {
    setData([]);
    setActive(item);
  };

  // ------------------------: UTILITY DATA :-------------------------
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

  // ---------------------: START RENDERING :-----------------------
  if (currRow && showDetails) {
    return <RepairDetails active={active} setRepairDetail={setShowDetails} row={currRow} />;
  }

  return (
    <Fragment>
      {/* ----------------: TabBar :------------------- */}
      <div>
        <TabBar menus={RepairTabMenus} active={active} setActive={onTabChange} />
      </div>
      {/* ----------------: TabBarBody :--------------- */}
      <div className='pb-5'>
        {/* ---------------------: DATA TABLE :-------------------- */}
        <PrimaryTable
          header={active?.header || []}
          data={allData[active.key] || []}
          type={`${active?.id}`}
          classNames={''}
          level={0}
          actions={actions[active.id]}
          loading={allRepairRequestApi.isLoading || false}
        />

        {/* -----------------------: MODAL FORMS :----------------------- */}
        <QueryForm row={currRow} show={showQueryForm} setShow={setShowQueryForm} />
        <AddCommentForm show={showCommentForm} setShow={setShowCommentForm} />
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
    </Fragment>
  );
};

export default RepairRequest;