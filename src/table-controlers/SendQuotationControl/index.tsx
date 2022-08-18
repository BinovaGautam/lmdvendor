import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../../components';
import AddCommentForm from '../../components/AddCommenForm';
import SendQuotationForm from '../../components/SendQuotationForm';
import { ISendQuotationControl } from '../type';

const SendQuotationControl = ({ row }: ISendQuotationControl) => {
  const [show, setShow] = useState<boolean>(false);
  const [btnTitle, setBtnTitle] = useState<string>(row?.quotations ? 'Quoted' : 'Send Quotation');
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [allowQuotation, setAllowQuotation] = useState<boolean>(row?.quotations ? false : true);

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
        show={!showCommentForm && show}
        setShow={setShow}
        setShowCommentForm={setShowCommentForm}
      />

      <AddCommentForm show={showCommentForm} setShow={setShowCommentForm} />
    </div>
  );
};

export default SendQuotationControl;
