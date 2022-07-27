import React, { Fragment } from 'react';
import { QueryFormModel } from '../../models/QueryFormModel';
import ModalForm from '../ModalForm';
import OverlayContainer from '../OverlayContainer';
import PrimaryButton from '../PrimaryButton';

const QueryForm = ({ show, setShow, row }: QueryFormModel) => {
  return (
    <OverlayContainer show={show}>
      <ModalForm title={'Queries'} onClose={() => setShow(false)}>
        <div className='flex flex-col gap-y-4'>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='query' className='text-primary-2 text-semibold'>
              Describe
            </label>
            <textarea
              name=''
              id='query'
              rows={5}
              className='rounded-xl outline-none border-2 border-gray-primary-1 p-2'></textarea>
          </div>
          <PrimaryButton
            title={'Send'}
            classNames={'w-full bg-primary-2 text-white py-3'}
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      </ModalForm>
    </OverlayContainer>
  );
};

export default QueryForm;
