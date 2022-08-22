import { Fragment, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PreventiveAPI from '../../api/preventiveApi';
import AuthAPI from '../../api/usersApi';
import AddCommentForm from '../../components/AddCommenForm';
import PrimaryTable from '../../components/PrimaryTable';
import ScheduleAppointmentForm from '../../components/ScheduleAppointmentForm';
import SendQuotationForm from '../../components/SendQuotationForm';
import TabBar from '../../components/TabBar';
import { TabMenuModal } from '../../models/TabBarModel';
import { RootState } from '../../state/reducers';
import {
  DemoData,
  PreventiveCompleteTableHeader,
  PreventiveInProgressTableHeader,
  PreventivePendingTableHeader,
  PrimitiveTabMenus,
} from './data';
import RepairDetails from './RepairDetails';

type Props = {
  showDetails: boolean;
  setShowDetails: (value: boolean) => void;
};

const updateCompanyInfo = (data: any[]) => {};

const PremitiveMaintenance = ({ showDetails, setShowDetails }: Props) => {
  // ------------------------: Query Client : ---------------------------

  const queryClient = useQueryClient();

  // -----------------------: REDUX STATE :---------------------
  const { user } = useSelector((state: RootState) => state.userState);

  // ----------------------: MANAGE STATE :----------------------
  const [currRow, setCurrRow] = useState<any>(undefined);
  const [tabMenus, setTabMenus] = useState<TabMenuModal[]>(PrimitiveTabMenus);
  const [active, setActive] = useState<TabMenuModal>(tabMenus[1]);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [showSendQuotationForm, setShowSendQuotationForm] = useState<boolean>(false);
  const [showScheduleAppointmentForm, setScheduleAppointmentForm] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [companyIds, setCompanyIds] = useState<string[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [allData, setAllData] = useState<{ [key: string]: any[] }>({
    inProgress: [],
    complete: [],
    pending: [],
  });

  // ---------------------------: React Queries :-------------------------
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _getDspListQuery = useQuery('getDspList', AuthAPI.getRepairShopOwners, {
    onSuccess: (response: any) => {
      // code
      if (response.data) {
        const { data } = response.data || {};
        setCompanies(data);
        const companyIds = data.map((dsp: any) => dsp.id);
        setCompanyIds(companyIds);
      }
    },
    onError: (error: Error) => {
      console.error(error.message);
      toast.error('Something went wrong..');
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getPreventiveRequest = useQuery(
    'getPreventiveRequest',
    PreventiveAPI.getPreventiveRequestList,
    {
      onSuccess: (response: any) => {
        if (response.data) {
          const { data } = response.data || {};

          let menus = [...tabMenus];
          let inProgress = data?.filter(
            (row: any) =>
              row.status_id === '1' ||
              row.status_id === '2' ||
              row.status_id === '3' ||
              row.status_id === '4' ||
              row.status_id === '5'
          );

          let completed = data?.filter(
            (row: any) => row.status_id === '6' || row.status_id === '7'
          );

          menus[1].title = `In Progress (${inProgress.length})`;
          menus[2].title = `Completed (${completed.length})`;

          setTabMenus(menus);
          setAllData({ ...allData, inProgress, completed });
        }
      },
      onError: (error: Error) => {
        console.error(error);
        toast.error('Something went wrong!');
      },
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getPreventiveVehicleList = useQuery(
    ['getPreventiveVehicleList', companyIds],
    async () => await PreventiveAPI.getVehicleList(companyIds),
    {
      enabled: !!companyIds.length,
      onSuccess: (response: any) => {
        if (response.data) {
          const { data } = response.data || {};

          // extract keys
          const keys = Object.keys(data);
          let pending: any[] = [];

          // normalize data
          keys.forEach((key: string, index: number) => {
            data[key].forEach((d: any) => {
              pending.push(d);
            });

            if (index === keys.length - 1) {
              pending = pending.map((d: any) => {
                const company = companies.find((c: any) => c.id === d.company);
                return {
                  ...d,
                  company_name: company.company_name,
                };
              });

              let menus = [...tabMenus];
              menus[0].title = `Pending (${pending.length})`;
              setAllData({ ...allData, pending });
              setTabMenus(menus);
            }
          });
        }
      },
      onError: (error: Error) => {
        console.error(error.message);
        toast.error('Something went wrong..');
      },
    }
  );

  // mutations
  const UpdateStatusApi = useMutation('updateStatus', PreventiveAPI.updateStatus, {
    onSuccess: (response: any) => {
      if (response.response) {
        toast.error(response.response.data.message);
        return;
      }

      toast.success('Update successfully!');
      queryClient.invalidateQueries('getPreventiveRequest');
      setShowDetails(false);
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error('something went wrong!!');
    },
  });

  // ------------------------: UTILITY FUNCTION :-----------------------
  const onTabChange = async (item: TabMenuModal) => {
    setData([]);
    setActive(item);
  };

  // ------------------------: UTILITY DATA :-------------------------
  const actions: { [key: string]: any } = {
    pending: {},
    completed: {
      onClickButton: (row: any) => {
        setCurrRow(row);
        setShowDetails(true);
      },
    },
    inProgress: {
      onClickButton: (row: any) => {
        setCurrRow(row);
        setShowDetails(true);
      },
      onSubmit: async (row: any) => {
        // update status
        await UpdateStatusApi.mutateAsync({
          id: +row.id,
          status: 6,
        });
      },
      apiHandler: UpdateStatusApi,
    },
  };

  // ---------------------: START RENDERING :-----------------------
  if (currRow && showDetails) {
    return (
      <RepairDetails
        active={active}
        setRepairDetail={setShowDetails}
        row={currRow}
        type='preventive'
        onSubmit={actions[active.key]?.onSubmit}
        submitLoader={actions[active.key]?.apiHandler?.isLoading}
      />
    );
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
          data={allData[active.key] || []}
          type={`${active?.id}`}
          classNames={''}
          level={0}
          actions={actions[active.key]}
          loading={getPreventiveVehicleList.isLoading || getPreventiveRequest.isLoading}
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
