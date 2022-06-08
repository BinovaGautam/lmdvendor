import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { RepairRequestModel } from '../../models/RepairRequestModel';
import { useCreateQuotationMutation } from '../../services/QuotationApi';

import { useListRepairRequestsQuery } from '../../services/RepairRequestsApi';
import './RepairRequests2.css';

interface ISendQuoteFormInputs {
  estimatedAmount: number;
  workHour: number;
  quotationFile: FileList;
  nextAvailableSlot: Date[];
}

const schema = yup
  .object({
    estimatedAmount: yup.number().required(),
    workHour: yup.number().required(),
    quotationFile: yup.mixed().test('required', 'Required', (value) => {
      return value !== null;
    }),
    nextAvailableSlot: yup.array().required(),
  })
  .required();

export default function RepairRequest2() {
  // TODO: TO change the role here
  const { data: repairRequests } = useListRepairRequestsQuery({ role: 'repair_shop' });
  const [clickedSendQuoationRow, setClickedSendQuoationRow] = React.useState<
    RepairRequestModel | undefined
  >(undefined);
  const { handleSubmit, control, register, watch } = useForm(
    /* <ISendQuoteFormInputs> */ {
      // resolver: yupResolver(schema),
    }
  );

  const [createQuotationMutation] = useCreateQuotationMutation();

  const vehicleColumnTemplate = (rowData: RepairRequestModel) => {
    return (
      <div className='flex flex-row items-center gap-3'>
        <Avatar
          image='https://play-lh.googleusercontent.com/-x4PqBRqkt7TUPlqBhD2T4KrFpJ7DDViz0ve2wTKh0491Leh-MMNvjhlHihwXO7JlrE=s256-rw'
          className=''
          shape='circle'
        />
        <p className='text-base font-semibold tracking-wide text-dark-primary-3'>
          {rowData.vehicle.name}
        </p>
      </div>
    );
  };

  const normalTextColumnTemplate = (text: string) => {
    return <p>{text}</p>;
  };

  const actionColumnTemplate = (rowData: RepairRequestModel) => {
    return (
      <div className='flex flex-row items-center gap-8'>
        <Button
          label={
            rowData.quotations && rowData.quotations.length > 0
              ? 'View Quotations'
              : 'Send Quotation'
          }
          className='p-button-outlined p-button-sm send-quote-btn'
          onClick={() => {
            rowData.quotations && rowData.quotations.length > 0
              ? navigateToViewQuotationPage(rowData)
              : showSendQuotationDialog(rowData);
          }}
        />
        <Button
          icon='pi pi-ellipsis-v'
          className='p-button-rounded p-button-text'
          aria-label='More Options'
        />
      </div>
    );
  };

  const hideSendQuotationDialog = () => {
    setClickedSendQuoationRow(undefined);
  };

  const showSendQuotationDialog = (rowData: RepairRequestModel) => {
    setClickedSendQuoationRow(rowData);
  };

  const navigateToViewQuotationPage = (rowData: RepairRequestModel) => {
    window.alert('TBD');
  };

  const renderSendQuotationDialogHeader = () => {
    return <div>Send Quote</div>;
  };

  const onSubmitHandler = (data: any) => {
    console.log(data);
    const formData = new FormData();
    formData.append('estimated_amount', data.estimatedAmount);
    formData.append('work_hour', data.workHour);
    formData.append('slot_start_date', data.nextAvailableSlot[0].toISOString());
    formData.append('slot_end_date', data.nextAvailableSlot[1].toISOString());
    formData.append('quotation', data.quotationFile[0]);

    createQuotationMutation({
      body: formData,
      repairRequestId: clickedSendQuoationRow?.id.toString() || '',
    });
  };

  const dialog = () => (
    <Dialog
      header={renderSendQuotationDialogHeader}
      visible={!!clickedSendQuoationRow}
      onHide={() => hideSendQuotationDialog()}
      style={{ width: '100%', maxWidth: '530px' }}>
      <form
        id='sendQuoteForm'
        className='flex flex-col gap-9'
        onSubmit={handleSubmit(onSubmitHandler)}>
        <div className='flex flex-col gap-3'>
          <label className='text-lg font-medium text-dark-primary-2'>Estimated Amount</label>
          <Controller
            control={control}
            name='estimatedAmount'
            render={({ field: { onChange, onBlur, value } }) => (
              // <InputText id='estimatedAmount' onChange={onChange} onBlur={onBlur} value={value} />
              <InputNumber
                inputId='estimatedAmount'
                value={value}
                onValueChange={(e) => onChange(e.value)}
                mode='currency'
                currency='USD'
                locale='en-US'
                onBlur={onBlur}
                showButtons
                step={10.0}
                min={0}
                minFractionDigits={2}
              />
            )}
          />
        </div>

        <div className='flex flex-col gap-3'>
          <label className='text-lg font-medium text-dark-primary-2'>Work Hour</label>
          <Controller
            control={control}
            name='workHour'
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText id='workHour' onChange={onChange} onBlur={onBlur} value={value} />
            )}
          />
        </div>

        <div className='flex flex-col gap-3'>
          <label className='text-lg font-medium text-dark-primary-2'>Estimated Amount</label>
          <div className='file-upload'>
            <input
              className='hidden'
              type='file'
              id='quotationFile'
              {...register('quotationFile')}
            />
            <label
              htmlFor='quotationFile'
              className='w-full pl-4 text-left cursor-pointer lg:pl-0 lg:text-center'>
              {watch('quotationFile') && watch('quotationFile').length > 0 ? (
                watch('quotationFile')[0].name
              ) : (
                <div className='flex flex-col items-center justify-center gap-2'>
                  <i className='text-3xl pi pi-file-pdf text-dark-primary-2'></i>
                  <span className='text-sm font-medium leading-6 text-dark-primary-2'>
                    Attach PDF
                  </span>
                </div>
              )}
            </label>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <label className='text-lg font-medium text-dark-primary-2'>Next Available Slot</label>
          <Controller
            control={control}
            name='nextAvailableSlot'
            render={({ field: { onChange, onBlur, value } }) => (
              <Calendar
                id='range'
                selectionMode='range'
                showTime
                showIcon
                hourFormat='12'
                readOnlyInput
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </div>

        <Button label='Send Quote' type='submit' form='sendQuoteForm' />
      </form>
    </Dialog>
  );

  return (
    <>
      {dialog()}
      <section className='pr-0 lg:pr-12'>
        <header className='text-[22px] font-semibold tracking-wider text-dark-primary-2 text-center lg:text-left'>
          Repair Request
        </header>

        <main className='p-8 my-5 border border-solid rounded-2xl'>
          <DataTable value={repairRequests} responsiveLayout='stack'>
            <Column field='vehicle' header='Vehicle' body={vehicleColumnTemplate}></Column>
            <Column
              header='Reapir Type'
              body={(rowData) => normalTextColumnTemplate(rowData.repair_type)}></Column>
            <Column
              header='Notes'
              body={(rowData) => normalTextColumnTemplate(rowData.notes)}></Column>
            <Column
              header='Severity'
              body={(rowData) => normalTextColumnTemplate(rowData.severity)}></Column>
            <Column header='Action' body={actionColumnTemplate}></Column>
          </DataTable>
        </main>
      </section>
    </>
  );
}
