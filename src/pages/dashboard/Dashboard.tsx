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

export default function Dashboard() {
  const [active, setActive] = useState<TabMenuModal>(TabMenus[0]);
  const [showQueryForm, setQueryForm] = useState<boolean>(false);
  const [showCommentForm, setCommentForm] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  const repairRequestListApi = useQuery(
    ['repairRequestList', active.id + 1],
    async () => await RepairAPI.getRepairRequests(active.id + 1),
    {
      onSuccess: (response: any) => {
        console.log({ response });
        if (response.data) {
          setData(response.data.data);
        }
      },
      onError: (error: any) => {
        console.log({ error });
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
        setCommentForm(true);
      },
      onQuery: (row: any) => {
        setQueryForm(true);
      },
    },
    {
      onClickButton: (row: any) => {
        console.log({ row, type: 'Waiting' });
      },
    },
  ];

  console.log({ active });

  return (
    <div className='h-full flex flex-col gap-y-5 pb-5'>
      {/* ----------------: Header :------------------- */}
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl text-primary-2'>Repair Request</h2>
        <div className='flex items-center gap-x-4'>
          <PrimaryButton
            title={'Repair Request'}
            classNames={'py-2 px-5 font-medium bg-primary-2 text-white'}
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
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
      {/* ----------------: TabBar :------------------- */}
      <div>
        <TabBar menus={TabMenus} active={active} setActive={onTabChange} />
      </div>
      {/* ----------------: TabBarBody :--------------- */}
      <div>
        <PrimaryTable
          header={active?.header || []}
          data={data || []}
          type={''}
          classNames={''}
          level={0}
          actions={actions[active?.id || 0]}
          loading={repairRequestListApi.isLoading}
        />
        <QueryForm show={showQueryForm} setShow={setQueryForm} />
        <AddCommentForm show={showCommentForm} setShow={setCommentForm} />
      </div>
    </div>
  );
}
