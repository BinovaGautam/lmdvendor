import React, { useEffect, useState } from 'react';
import DotsOption from '../../components/DotsOption';
import QueryForm from '../../components/QueryForm';
import { IQueryControl } from '../type';

const QueryControl = ({ row }: IQueryControl) => {
  const [showDrop, setShowDrop] = useState<boolean>(row.quotations ? true : false);
  const [showQueryForm, setShowQueryForm] = useState<boolean>(false);
  const options = [
    {
      title: 'Queries',
      func: 'onQuery',
    },
  ];

  const actions = {
    onQuery: (row: any) => {
      setShowQueryForm(true);
    },
  };

  // listener row change
  useEffect(() => {
    if (row) {
      let { quotations } = row || {};
      if (quotations) {
        setShowDrop(true);
      } else {
        setShowDrop(false);
      }
    }
  }, [row]);

  return (
    <div>
      <DotsOption options={options} row={row} actions={actions} showDrop={showDrop} />
      {showQueryForm && <QueryForm row={row} show={showQueryForm} setShow={setShowQueryForm} />}
    </div>
  );
};

export default QueryControl;
