import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { RepairTypeModel } from '../../models/RepairTypeModel';
import { VehicleModel } from '../../models/VehicleModel';
import { VehicleSeverityModel } from '../../models/VehicleSeverityModel';
import { useCreateRepairRequestMutation } from '../../services/RepairRequestsApi';
import { useRepairTypesQuery } from '../../services/RepairTypesApi';
import { useVehiclesQuery } from '../../services/VehicleApi';
import { useSeveritiesQuery } from '../../services/VehicleSeveritiesApi';
import './CreateRepairRequest.css';

interface IRepairRequestFormInputs {
  vehicle: VehicleModel;
  repairType: RepairTypeModel;
  notes: string;
  severity: VehicleSeverityModel;
  prevInspectionReport: FileList;
  currentDamageReport: FileList;
}

const schema = yup
  .object({
    vehicle: yup.object().required(),
    repairType: yup.object().required(),
    notes: yup.string().required(),
    severity: yup.object().required(),
    prevInspectionReport: yup.mixed().test('required', 'Required', (value) => {
      return value !== null;
    }),
    currentDamageReport: yup.mixed().test('required', 'Required', (value) => {
      return value !== null;
    }),
  })
  .required();

export default function CreateRepairRequest() {
  const { data: vehicles } = useVehiclesQuery();
  const { data: repairTypes } = useRepairTypesQuery();
  const { data: severities } = useSeveritiesQuery();
  const [createRepairRequestMutation] = useCreateRepairRequestMutation();

  const { handleSubmit, control, register, watch } = useForm<IRepairRequestFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: any) => {
    console.log(data);
    const formData = new FormData();
    formData.append('vehicle_id', data.vehicle.id);
    formData.append('repair_type_id', data.repairType.id);
    formData.append('severity_id', data.severity.id);
    formData.append('inspection_report', data.prevInspectionReport[0]);
    formData.append('damage_report', data.currentDamageReport[0]);
    formData.append('notes', data.notes);

    createRepairRequestMutation(formData);
  };

  return (
    <div className='flex flex-col w-full'>
      <h1 className='text-2xl font-semibold capitalize text-dark-primary-2'>
        Create Repair Request
      </h1>

      <div className='pt-10 pb-12 pl-4 pr-6 mt-8 border border-divider-color rounded-2xl'>
        <form
          id='createRepairRequestForm'
          className='grid grid-cols-1 lg:grid-cols-2 gap-9'
          onSubmit={handleSubmit(onSubmitHandler)}>
          <div className='flex flex-col gap-3'>
            <label className='text-lg font-medium text-dark-primary-2'>Select Vehicle</label>
            <Controller
              control={control}
              name='vehicle'
              render={({ field: { onChange, onBlur, value } }) => (
                <Dropdown
                  options={vehicles}
                  onChange={onChange}
                  onBlur={onBlur}
                  optionLabel='name'
                  value={value}
                />
              )}
            />
          </div>

          <div className='flex flex-col gap-3'>
            <label className='text-lg font-medium text-dark-primary-2'>Select Repair Type</label>
            <Controller
              control={control}
              name='repairType'
              render={({ field: { onChange, onBlur, value } }) => (
                <Dropdown
                  options={repairTypes}
                  onChange={onChange}
                  onBlur={onBlur}
                  optionLabel='name'
                  value={value}
                />
              )}
            />
          </div>

          <div className='file-upload'>
            <input
              className='hidden'
              type='file'
              id='prevInspectionReport'
              {...register('prevInspectionReport')}
            />
            <label
              htmlFor='prevInspectionReport'
              className='w-full pl-4 text-left cursor-pointer lg:pl-0 lg:text-center'>
              {watch('prevInspectionReport') && watch('prevInspectionReport').length > 0
                ? watch('prevInspectionReport')[0].name
                : 'Upload Previous Inspection Report'}
            </label>
          </div>

          <div className='file-upload'>
            <input
              className='hidden'
              type='file'
              id='currentDamageReport'
              {...register('currentDamageReport')}
            />
            <label
              htmlFor='currentDamageReport'
              className='w-full pl-4 text-left cursor-pointer lg:pl-0 lg:text-center'>
              {watch('currentDamageReport') && watch('currentDamageReport').length > 0
                ? watch('currentDamageReport')[0].name
                : 'Upload Current Damage Report'}
            </label>
          </div>

          <div className='flex flex-col col-span-1 gap-3 lg:col-span-2'>
            <label className='text-lg font-medium text-dark-primary-2'>Add Notes</label>
            <Controller
              control={control}
              name='notes'
              render={({ field: { onChange, onBlur, value } }) => (
                <InputTextarea
                  autoResize
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  rows={5}
                  cols={30}
                />
              )}
            />
          </div>

          <div className='flex flex-col gap-3'>
            <label className='text-lg font-medium text-dark-primary-2'>Severity</label>
            <Controller
              control={control}
              name='severity'
              render={({ field: { onChange, onBlur, value } }) => (
                <Dropdown
                  options={severities}
                  onChange={onChange}
                  onBlur={onBlur}
                  optionLabel='name'
                  value={value}
                />
              )}
            />
          </div>
        </form>
      </div>

      <div className='flex flex-row justify-end my-9'>
        <Button
          type='submit'
          form='createRepairRequestForm'
          label='Create Request'
          className='items-end rounded-lg w-60 bg-primary-contrast create-repair-request-button'
        />
      </div>
    </div>
  );
}
