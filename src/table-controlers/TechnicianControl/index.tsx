import { ITechnicianControl } from '../type';
import { useState } from 'react';
import DotsOption from '../../components/DotsOption';
import { ChooseTechnicians } from '../../components';

const TechnicianControl = ({ row, type }: ITechnicianControl) => {
  const [showDrop, setShowDrop] = useState<boolean>(true);
  const [showChooseTechnician, setShowChooseTechnician] = useState<boolean>(false);

  const options = [
    {
      title: 'Reason for Reject',
      func: 'onRejectReason',
    },
    {
      title: 'Assign Technician',
      func: 'onAssignTechnician',
    },
    {
      title: 'Add technician',
      func: 'onAddTechnician',
    },
  ];

  const actions = {
    onAssignTechnician: (row: any) => {
      setShowChooseTechnician(true);
    },
  };

  return (
    <div>
      <DotsOption options={options} row={row} actions={actions} showDrop={showDrop} />
      {showChooseTechnician && (
        <ChooseTechnicians
          row={row}
          show={showChooseTechnician}
          setShow={setShowChooseTechnician}
          type={type}
        />
      )}
    </div>
  );
};

export default TechnicianControl;

