import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { Fragment,useState } from 'react';
import { CommentFormModel } from '../../models/CommentFormModel';
import { handleImageOnError } from '../../utils/helpers';
import ModalForm from '../ModalForm';
import OverlayContainer from '../OverlayContainer';
import PrimaryButton from '../PrimaryButton';
import techniciansArr from './data';

const ChooseTechnicians = ({ show, setShow }: CommentFormModel) => {
  const [selectedIndex , setSelectedIndex] = useState<number>(0)
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
           
           {
            techniciansArr && techniciansArr.map((technician, index) => {
              let selected = selectedIndex === index;
              let {name  ,accountId,phone } = technician;
              return (
                 <div onClick={() => setSelectedIndex(index)}
                    className={`flex  mh-auto min-h-fit p-2 rounded-lg border text-primary-2 cursor-pointer  ${
                      selected && 'bg-primary text-white'
                    } `}>
                    <div className='flex items-center justify-center  overflow-hidden px-2  '>
                      <img src='' alt='' className='w-12 h-12 rounded-full' onError={handleImageOnError} />
                    </div>
                    <div className={`p-1 flex-grow ${selected &&  'text-white'} `}>
                      <span className={'font-[500] text-lg'}>{name}</span> <br />
                      <span className='text-sm'>ID : {accountId}</span>
                      <br />
                      <span className='text-sm'>{phone} </span>
                    </div>
                    <div className={`flex flex-row  justify-center  mr-2  ${selected && 'text-white'} `}>
                      <PencilAltIcon className='w-6 h-6 mr-2' />
                      <TrashIcon className='w-6 h-6' />
                    </div>
                  </div>

              )
           })}
          
          {/* <div className='flex flex-col gap-y-2'>
            <label htmlFor='query' className='text-primary-2 text-semibold'>
              Comment
            </label>
            <textarea
              name=''
              id='query'
              rows={5}
              className='rounded-xl outline-none border-2 border-gray-primary-1 p-2'></textarea>
          </div> */}
          <PrimaryButton
            title={'ASSIGN'}
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

export default ChooseTechnicians;

