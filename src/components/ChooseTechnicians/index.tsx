import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { Fragment, useState } from 'react';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import TechnicianAPI from '../../api/technicianApi';
import { AssignTechnicians, IAssignTechniciansPreventive } from '../../api/types';
import { ChooseTechniciansModel } from '../../models/ChooseTechniciansModel';
import { TechnicianModel } from '../../models/TechnicianModel';
import { RootState } from '../../state/reducers';
import { handleImageOnError } from '../../utils/helpers';
import ModalForm from '../ModalForm';
import OverlayContainer from '../OverlayContainer';
import PrimaryButton from '../PrimaryButton';
import techniciansArr from './data';

const ChooseTechnicians = ({ show, setShow, row, type }: ChooseTechniciansModel) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { user } = useSelector((state: RootState) => state.userState);
  const [technicians, setTechnicians] = useState<TechnicianModel[]>([]);

  const queryClient = useQueryClient();

  const id = row?.id;

  const getTechniciansApi = useQuery(
    ['getTechnicians', id],
    async () =>
      await TechnicianAPI.getAllTechnicians({ vendor_account_id: user?.account_id as string }),
    {
      onSuccess: (response: any) => {
        if (response.response) {
          toast.error('Something went wrong please refresh this page');
          return;
        }

        setTechnicians(response.data.data);
        // toast.success("")
      },
      onError: (error: Error) => {
        console.log(error);
        toast.error('Something went wrong please reload this page');
      },
      enabled: !!id,
    }
  );

  // --------------------------------: Mutations :-----------------------------------
  const AssignTechnicianRepairRequestApi = useMutation(
    'assignTechnicianRepairRequest',
    TechnicianAPI.assignTechnicianRepairRequest,
    {
      onSuccess: (response: any) => {
        // console.log('Response=> ', response);
        if (response.response) {
          toast.error(response.response.message);
          return;
        }

        toast.success('Assigned successfully!');
        setSelectedIndex(0);
        setShow(false);
        queryClient.invalidateQueries('allRpairRequest');
      },
      onError: (error: Error) => {
        console.log(error);
        toast.error('Something went wrong!');
      },
    }
  );

  const AssignTechnicianPreventiveRequestApi = useMutation(
    'assignTechnicianPreventiveRequest',
    TechnicianAPI.assignTechnicianPreventiveRequest,
    {
      onSuccess: (response: any) => {
        // console.log('Response=> ', response);
        if (response.response) {
          toast.error(response.response.message);
          return;
        }

        toast.success('Assigned successfully!');
        setSelectedIndex(0);
        setShow(false);
        queryClient.invalidateQueries('getPreventiveRequest');
      },
      onError: (error: Error) => {
        console.log(error);
        toast.error('Something went wrong!');
      },
    }
  );

  const onAssignTechnician = (technician: TechnicianModel) => {
    const data: { [key: string]: any } = {
      // repair_request_id: id,
      vendor_account_id: user?.account_id as string,
      technicians: [
        {
          technician_account_id: technician.account_id,
        },
      ],
    };

    if (type === 'preventive') {
      data['preventive_request_id'] = +id;
      const updatedData = data as IAssignTechniciansPreventive;
      AssignTechnicianPreventiveRequestApi.mutate(updatedData);
    }

    if (type === 'repair') {
      data['repair_request_id'] = id;
      const updatedData = data as AssignTechnicians;
      AssignTechnicianRepairRequestApi.mutate(updatedData);
    }
  };

  return (
    <OverlayContainer show={show}>
      <ModalForm title={'Assign Technician'} onClose={() => setShow(false)}>
        <div className='flex flex-col gap-y-4'>
          <div className='flex flex-row gap-3'>
            <InputText placeholder='Search' className='w-full flex-1 shadow-md' />
            <Button
              label='Add Notes'
              className='w-32 bg-transparent text-primary  border-primary rounded-lg cursor-pointer '
            />
          </div>
          <div className='max-h-80 overflow-y-scroll no-scrollbar'>
            {getTechniciansApi.isLoading && <h2>Loading...</h2>}
            {technicians &&
              technicians.map((technician: TechnicianModel, index: number) => {
                let selected = selectedIndex === index;
                let { name, account_id, phone } = technician;
                return (
                  <div
                    onClick={() => setSelectedIndex(index)}
                    className={`flex  mh-auto min-h-fit p-2 rounded-lg border text-primary-2 cursor-pointer  ${
                      selected && 'bg-primary text-white'
                    } `}>
                    <div className='flex items-center justify-center  overflow-hidden px-2  '>
                      <img
                        src=''
                        alt=''
                        className='w-12 h-12 rounded-full'
                        onError={handleImageOnError}
                      />
                    </div>
                    <div className={`p-1 flex-grow ${selected && 'text-white'} `}>
                      <span className={'font-[500] text-lg'}>{name}</span> <br />
                      <span className='text-sm'>ID : {account_id}</span>
                      <br />
                      <span className='text-sm'>{phone} </span>
                    </div>
                    <div
                      className={`flex flex-row  justify-center  mr-2  ${
                        selected && 'text-white'
                      } `}>
                      <PencilAltIcon className='w-6 h-6 mr-2' />
                      <TrashIcon className='w-6 h-6' />
                    </div>
                  </div>
                );
              })}
          </div>

          <PrimaryButton
            title={'ASSIGN'}
            classNames={'w-full bg-primary-2 text-white py-3 font-semibold hover:bg-[#1f1d66c7]'}
            onClick={() => onAssignTechnician(technicians[selectedIndex])}
            loading={
              AssignTechnicianRepairRequestApi.isLoading ||
              AssignTechnicianPreventiveRequestApi.isLoading
            }
          />
        </div>
      </ModalForm>
    </OverlayContainer>
  );
};

export default ChooseTechnicians;
