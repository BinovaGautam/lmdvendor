import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import TechnicianAPI from '../../api/technicianApi';
import AddEditTechnicianForm from '../../components/AddEditTechnicianForm';
import PrimaryButton from '../../components/PrimaryButton';
import PrimaryTable from '../../components/PrimaryTable';
import { RootState } from '../../state/reducers';
import { TechniciansTableHeader } from './data';

const Technician = () => {
  const { user } = useSelector((state: RootState) => state.userState);
  const [technicians, setTechnicians] = useState<any[]>();
  const [showAddEditTech, seyShowAddEditTech] = useState<boolean>(false);

  const getTechniciansApi = useQuery(
    'getAlltechnician',
    async () =>
      await TechnicianAPI.getAllTechnicians({ vendor_account_id: user?.account_id as string }),
    {
      onSuccess: (response: any) => {
        if (response.data.data) {
          setTechnicians(response.data.data);
        }
      },
      onError: (error: Error) => {
        toast.error('Something went wrong please reload this page...');
      },
    }
  );

  return (
    <div className='h-full flex flex-col gap-y-5 pb-5'>
      {/* --------------------------: Header :---------------------- */}
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl text-primary-2'>Technicians</h2>
        <div className='flex items-center gap-x-4'>
          <PrimaryButton
            title={'+ Add Technicians'}
            classNames={'py-2 px-5 font-medium border-[1px] border-primary-2 text-primary-2'}
            onClick={() => seyShowAddEditTech(true)}
          />
        </div>
      </div>
      <div className='pb-5'>
        <PrimaryTable
          header={TechniciansTableHeader}
          data={technicians || []}
          type={`technicians`}
          classNames={''}
          level={0}
          actions={[]}
          loading={getTechniciansApi.isLoading || false}
        />

        <AddEditTechnicianForm show={showAddEditTech} setShow={seyShowAddEditTech} />
      </div>
    </div>
  );
};

export default Technician;
