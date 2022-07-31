import { TrashIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import RepairAPI from '../../api/repairApi';
import TechnicianAPI from '../../api/technicianApi';
import { AddEditTechnicianFormModel } from '../../models/AddEditTechnicianFormModel';
import { RootState } from '../../state/reducers';
import ModalForm from '../ModalForm';
import OverlayContainer from '../OverlayContainer';
import PrimaryButton from '../PrimaryButton';
import SingleFileUploader from '../SingleFIleUploader';

interface IAddEditFormData {
  name: string;
  phone: string;
  email: string;
  technician_id: string;
  password: string;
  confirm_password: string;
}

const AddEditTechnicianForm = ({ show, setShow, data }: AddEditTechnicianFormModel) => {
  const { user } = useSelector((state: RootState) => state.userState);
  const [formData, setFormData] = useState<IAddEditFormData>({
    name: data?.name || '',
    phone: data?.phone || '',
    email: data?.email || '',
    technician_id: data?.technician_id || '',
    password: data?.password || '',
    confirm_password: data?.password || '',
  });
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const addTechnician = useMutation('addTechnician', TechnicianAPI.signUpTechnician, {
    onSuccess: (response: any) => {
      if (response.response) {
        toast.error(response.response.data.message);
        return;
      }

      toast.success('Add Successfully!');
      queryClient.invalidateQueries(['getAlltechnician']);
      setFormData({
        name: '',
        phone: '',
        email: '',
        technician_id: '',
        password: '',
        confirm_password: '',
      });
      setShow(false);
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error('Something went wrong');
    },
  });

  const handleChange = (e: any) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSave = () => {
    let errors: string[] = [];
    // =========================== validate data =======================
    if (!formData.email) errors.push('email');
    if (!formData.phone) errors.push('phone');
    // if (!formData.phone.length !== 10) errors.push('phone_length');
    if (!formData.technician_id) errors.push('technician_id');
    if (!formData.password) errors.push('password');
    if (!formData.confirm_password) errors.push('confirm_password');
    if (!formData.name) errors.push('name');

    if (formData.password !== formData.confirm_password) errors.push('mismatch_password');

    if (!errors.length) {
      // vendor_account_id
      let data = {
        vendor_account_id: user?.account_id as string,
        name: formData.name,
        phone: formData.phone,
        password: formData.password,
        email: formData.email,
      };
      addTechnician.mutate(data);
      return;
    }

    setSubmitErrors(errors);
    setTimeout(() => setSubmitErrors([]), 3000);
  };

  return (
    <OverlayContainer show={show}>
      <ModalForm
        title={data ? 'Edit Technician' : 'Add Technician'}
        onClose={() => setShow(false)}
        width='w-[703px]'>
        <div className='flex flex-col gap-y-4'>
          <div className='flex items-center justify-between gap-x-4'>
            <div className='flex flex-col gap-y-2 w-full'>
              <label className='font-medium text-primary-2' htmlFor='name'>
                Name
              </label>
              <input
                id='name'
                type='text'
                value={formData.name}
                name='name'
                onChange={handleChange}
                className='p-3 w-full border-[2px] border-[#DADDEB] rounded-xl outline-none focus:border-primary-2 text-base text-primary-2 transition-all duration-300'
              />
              {submitErrors.includes('name') && (
                <span className='text-sm text-primary-2'>is required</span>
              )}
            </div>
            <div className='flex flex-col gap-y-2 w-full'>
              <label className='font-medium text-primary-2' htmlFor='phone'>
                Phone Number
              </label>
              <input
                id='phone'
                type='text'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='p-3 w-full border-[2px] border-[#DADDEB] rounded-xl outline-none focus:border-primary-2 text-base text-primary-2 transition-all duration-300'
              />
              {submitErrors.includes('phone') && (
                <span className='text-sm text-primary-2'>is required</span>
              )}
            </div>
          </div>
          <div className='flex items-center justify-between gap-x-4'>
            <div className='flex flex-col gap-y-2 w-full'>
              <label className='font-medium text-primary-2' htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                type='email'
                value={formData.email}
                name='email'
                onChange={handleChange}
                className='p-3 w-full border-[2px] border-[#DADDEB] rounded-xl outline-none focus:border-primary-2 text-base text-primary-2 transition-all duration-300'
              />
              {submitErrors.includes('email') && (
                <span className='text-sm text-primary-2'>is required</span>
              )}
            </div>
            <div className='flex flex-col gap-y-2 w-full'>
              <label className='font-medium text-primary-2' htmlFor='technical_id'>
                Technicial ID
              </label>
              <input
                id='technical_id'
                type='text'
                value={formData.technician_id}
                name='technician_id'
                onChange={handleChange}
                className='p-3 w-full border-[2px] border-[#DADDEB] rounded-xl outline-none focus:border-primary-2 text-base text-primary-2 transition-all duration-300'
              />
              {submitErrors.includes('technician_id') && (
                <span className='text-sm text-primary-2'>is required</span>
              )}
            </div>
          </div>
          <div className='flex items-center justify-between gap-x-4'>
            <div className='flex flex-col gap-y-2 w-full'>
              <label className='font-medium text-primary-2' htmlFor='password'>
                Password
              </label>
              <input
                id='password'
                type='password'
                value={formData.password}
                name='password'
                onChange={handleChange}
                className='p-3 w-full border-[2px] border-[#DADDEB] rounded-xl outline-none focus:border-primary-2 text-base text-primary-2 transition-all duration-300'
              />
              {submitErrors.includes('password') && (
                <span className='text-sm text-primary-2'>is required</span>
              )}
            </div>
            <div className='flex flex-col gap-y-2 w-full'>
              <label className='font-medium text-primary-2' htmlFor='confirm_password'>
                Confirm Password
              </label>
              <input
                id='confirm_password'
                type='password'
                value={formData.confirm_password}
                onChange={handleChange}
                name='confirm_password'
                className='p-3 w-full border-[2px] border-[#DADDEB] rounded-xl outline-none focus:border-primary-2 text-base text-primary-2 transition-all duration-300'
              />
              {submitErrors.includes('confirm_password') && (
                <span className='text-sm text-primary-2'>is required</span>
              )}
              {submitErrors.includes('mismatch_password') && (
                <span className='text-sm text-primary-2'>
                  password and confirm password is different
                </span>
              )}
            </div>
          </div>
          <div className='flex items-center justify-end'>
            <PrimaryButton
              title={'Save'}
              classNames={'font-semibold px-8 bg-primary-2 text-white py-3'}
              onClick={onSave}
              loading={addTechnician.isLoading}
            />
          </div>
        </div>
      </ModalForm>
    </OverlayContainer>
  );
};

export default AddEditTechnicianForm;
