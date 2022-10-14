import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../../components';
import AddCommentForm from '../../components/AddCommenForm';
import SendQuotationForm from '../../components/SendQuotationForm';
import ScheduleAppointmentForm from '../../components/ScheduleAppointmentForm';
import { ISendQuotationControl } from '../type';
import { CreateQuotation, ScheduleAppoinment } from '../../api/types';
import { MutateOptions } from 'react-query';
import { toast } from 'react-toastify';

export interface ISendQuotationObj {
  data: CreateQuotation;
  mutate: (
    variables: CreateQuotation,
    options?: MutateOptions<any, any, CreateQuotation, unknown> | undefined
  ) => void;
}
export interface IScheduleObj {
  data: ScheduleAppoinment;
  mutate: (
    variables: ScheduleAppoinment,
    options?: MutateOptions<any, any, ScheduleAppoinment, unknown> | undefined
  ) => void;
}

const SendQuotationControl = ({ row }: ISendQuotationControl) => {
  const [show, setShow] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>('quotation');
  const [btnTitle, setBtnTitle] = useState<string>(row?.quotations ? 'Quoted' : 'Send Quotation');
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [allowQuotation, setAllowQuotation] = useState<boolean>(row?.quotations ? false : true);
  const [quotationsObj, setQuotationObject] = useState<ISendQuotationObj | undefined>(undefined);

  // Row chang listener
  useEffect(() => {
    if (row) {
      const { quotations } = row || {};
      if (quotations) {
        setBtnTitle('Quoted');
        setAllowQuotation(false);
      } else {
        setAllowQuotation(true);
        setBtnTitle('Send Quotation');
      }

      setShow(false);
      setShowCommentForm(false);
    }
  }, [row]);

  return (
    <div>
      <PrimaryButton
        onClick={() => {
          if (allowQuotation) {
            setShow(true);
          }
        }}
        title={btnTitle}
        classNames='w-32 py-[6px] bg-none border-[1px] border-primary-2 text-primary-2'
      />

      <SendQuotationForm
        row={row}
        show={formType === 'quotation' && show}
        setShow={setShow}
        getData={(data: CreateQuotation, mutate: ISendQuotationObj['mutate']) =>
          setQuotationObject({ data, mutate })
        }
        setShowCommentForm={(value: boolean) => {
          if (value) setFormType('comment');
          else setFormType('quotation');
        }}
        setShowScheduleForm={(value: boolean) => {
          if (value) setFormType('schedule');
          else {
            setShow(false);
            setFormType('quotation');
          }
        }}
      />

      <AddCommentForm
        show={formType === 'comment'}
        setShow={(value: boolean) => {
          if (!value) setFormType('quotation');
        }}
      />

      {formType === 'schedule' && (
        <ScheduleAppointmentForm
          show={formType === 'schedule'}
          setShow={(value: boolean) => {
            if (value) setShow(false);
            setFormType('quotation');
          }}
          row={row}
          getData={async (data: IScheduleObj['data'], mutate: IScheduleObj['mutate']) => {
            if (!quotationsObj) {
              toast.error('something went wrong press f5 for refresh this page');
            }

            await quotationsObj?.mutate(quotationsObj.data);
            mutate(data);
            // setShow(false);
          }}
        />
      )}
    </div>
  );
};

export default SendQuotationControl;
