import { PrimaryButton } from '../../components';
import { useState } from 'react';
import { ScheduleAppointmentForm } from '../../components';
import { UpdateQuotationControlModel } from '../../models/UpdateQuotationControllerModel';
import UpdateQuotationForm from '../../components/UpdateQuotationForm';

const UpdateQuotationController = ({ row }: UpdateQuotationControlModel) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      <PrimaryButton
        onClick={() => {
          setShow(true);
        }}
        title={'Update Quotation'}
        classNames='w-40 py-[6px] bg-none border-[1px] border-primary-2 text-primary-2 '
      />
      <UpdateQuotationForm show={show} setShow={setShow} row={row} />
    </div>
  );
};

export default UpdateQuotationController;
