import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import TechnicianAPI from '../../api/technicianApi';
import AddEditTechnicianForm from '../../components/AddEditTechnicianForm';
import DeleteTechnician from '../../components/DeleteTechnician';
import PrimaryButton from '../../components/PrimaryButton';
import PrimaryTable from '../../components/PrimaryTable';
import { RootState } from '../../state/reducers';
import { TechniciansTableHeader } from './data';

const Technician = () => {
  const { user } = useSelector((state: RootState) => state.userState);
  const [technicians, setTechnicians] = useState<any[]>();
  const [showAddEditTech, setShowAddEditTech] = useState<boolean>(false);
  const [showDeleteModel, setShowDeleteModel] = useState<boolean>(false);
  const [currRow, setCurrRow] = useState<any>();

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

  const actions = {
    universal: {
      edit: (row: any) => {
        setCurrRow(row);
        setShowAddEditTech(true);
      },
      delete: (row: any) => {
        setCurrRow(row);
        setShowDeleteModel(true);
      },
    },
  };

  useEffect(() => {
    if(!showAddEditTech) setCurrRow(undefined);
  }, [showAddEditTech]);


  return (
    <div className='h-full flex flex-col gap-y-5 pb-5'>
      {/* --------------------------: Header :---------------------- */}
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl text-primary-2'>Technicians</h2>
        <div className='flex items-center gap-x-4'>
          <PrimaryButton
            title={'+ Add Technicians'}
            classNames={'py-2 px-5 font-medium border-[1px] border-primary-2 text-primary-2'}
            onClick={() => setShowAddEditTech(true)}
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
          actions={actions}
          loading={getTechniciansApi.isLoading || false}
        />

        <AddEditTechnicianForm data={currRow} show={showAddEditTech} setShow={setShowAddEditTech} />
        <DeleteTechnician data={currRow} show={showDeleteModel} setShow={setShowDeleteModel} />
      </div>
    </div>
  );
};

export default Technician;
