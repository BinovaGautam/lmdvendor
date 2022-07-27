import React, { Fragment, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import QuotationAPI from '../../api/quotationApi';
import { SendQuery } from '../../api/types';
import { QueryFormModel } from '../../models/QueryFormModel';
import { RootState } from '../../state/reducers';
import ModalForm from '../ModalForm';
import OverlayContainer from '../OverlayContainer';
import PrimaryButton from '../PrimaryButton';

const QueryForm = ({ show, setShow, row }: QueryFormModel) => {
  const { user } = useSelector((state: RootState) => state.userState);
  const [query, setQuery] = useState<string>('');
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const sendQueryApi = useMutation('sendQueryApi', QuotationAPI.sendQuery, {
    onSuccess: (response: any) => {
      if (response.response) {
        toast.error(response.response.data.message);
        return;
      }
      toast.success('Query send successfully!');
      setQuery('');
      setShow(false);
      queryClient.invalidateQueries('repairRequestList');
    },
    onError: (error: any) => {
      console.log(error);
      toast.error('something went wrong!');
    },
  });

  const onSubmit = () => {
    let errors: string[] = [];

    if (!query) errors.push('query');

    console.log('no problem');

    const quotation = row.quotations.find(
      (quotation: any) => quotation.vendor_account_id === user?.account_id
    );

    if (!quotation) {
      toast.error('something went wrong please refresh the page!');
    }

    if (!errors.length) {
      const data = {
        repair_request_id: row.id,
        quotation_id: quotation.id,
        query: query,
        sender_type: 'Vendor',
        account_id: user?.account_id,
      };

      console.log({ data });

      sendQueryApi.mutate(data);
    }

    setSubmitErrors(errors);
    setTimeout(() => setSubmitErrors([]), 3000);
  };

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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='rounded-xl outline-none border-2 border-gray-primary-1 p-2'></textarea>
            {submitErrors.includes('query') && (
              <span className='text-sm text-primary-2'>is required</span>
            )}
          </div>
          <PrimaryButton
            title={'Send'}
            classNames={'w-full bg-primary-2 text-white py-3 font-semibold hover:bg-[#1f1d66c7]'}
            onClick={onSubmit}
            loading={sendQueryApi.isLoading}
          />
        </div>
      </ModalForm>
    </OverlayContainer>
  );
};

export default QueryForm;
