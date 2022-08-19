import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import AddCommentForm from '../../components/AddCommenForm';
import PrimaryTable from '../../components/PrimaryTable';
import ScheduleAppointmentForm from '../../components/ScheduleAppointmentForm';
import SendQuotationForm from '../../components/SendQuotationForm';
import TabBar from '../../components/TabBar';
import { TabMenuModal } from '../../models/TabBarModel';
import { RootState } from '../../state/reducers';
import { DemoData, PrimitiveTabMenus } from './data';
import RepairDetails from './RepairDetails';

type Props = {
  showDetails: boolean;
  setShowDetails: (value: boolean) => void;
};

const PremitiveMaintenance = ({ showDetails, setShowDetails }: Props) => {
  // -----------------------: REDUX STATE :---------------------
  const { user } = useSelector((state: RootState) => state.userState);

  // ----------------------: MANAGE STATE :----------------------
  const [currRow, setCurrRow] = useState<any>(undefined);
  const [tabMenus, setTabMenus] = useState<TabMenuModal[]>(PrimitiveTabMenus);
  const [active, setActive] = useState<TabMenuModal>(tabMenus[0]);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [showSendQuotationForm, setShowSendQuotationForm] = useState<boolean>(false);
  const [showScheduleAppointmentForm, setScheduleAppointmentForm] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  // ------------------------: UTILITY FUNCTION :-----------------------
  const onTabChange = async (item: TabMenuModal) => {
    setData([]);
    setActive(item);
  };

  // ------------------------: UTILITY DATA :-------------------------
  const actions: { [key: string]: any } = {
    pending: {
      onClickButton: (row: any) => {
        setCurrRow(row);
        setScheduleAppointmentForm(true);
      },
      onQuery: (row: any) => {
        setCurrRow(row);
      },
    },
    completed: {
      onClickButton: (row: any) => {
        setCurrRow(row);
        setShowDetails(true);
      },
    },
    paid: {
      onClickButton: (row: any) => {
        setCurrRow(row);
        setShowDetails(true);
      },
    },
  };

  // ---------------------: START RENDERING :-----------------------
  if (currRow && showDetails) {
    return <RepairDetails active={active} setRepairDetail={setShowDetails} row={currRow} />;
  }

  return (
    <Fragment>
      {/* ----------------: TabBar :------------------- */}
      <div>
        <TabBar menus={PrimitiveTabMenus} active={active} setActive={onTabChange} />
      </div>
      {/* ----------------: TabBarBody :--------------- */}
      <div className='pb-5'>
        {/* ---------------------: DATA TABLE :-------------------- */}
        <PrimaryTable
          header={active.header || []}
          data={DemoData}
          type={`${active?.id}`}
          classNames={''}
          level={0}
          actions={actions[active.key]}
          loading={false}
        />

        {/* -----------------------: MODAL FORMS :----------------------- */}
        <AddCommentForm show={showCommentForm} setShow={setShowCommentForm} />

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

export default PremitiveMaintenance;
