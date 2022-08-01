import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
  const [queries, setQueries] = useState<any[]>([]);
  const [query, setQuery] = useState<string>('');
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);

  const chatContainer = useRef<HTMLDivElement | null>(null);

  const queryClient = useQueryClient();

  const fetchQueries = row && row.quotations;

  const getQueriesList = useQuery(
    ['getQueries', row?.id],
    async () =>
      await QuotationAPI.getQueries(row.id, row.quotations[0].id, user?.account_id as string),
    {
      onSuccess: (response: any) => {
        if (response.data) {
          setQueries(response.data.data);
        }
      },
      onError: (error: Error) => {
        console.log(error);
        toast.error('Something went wrong please reload this page!');
      },
      enabled: !!fetchQueries,
    }
  );

  const sendQueryApi = useMutation('sendQueryApi', QuotationAPI.sendQuery, {
    onSuccess: (response: any) => {
      if (response.response) {
        toast.error(response.response.data.message);
        return;
      }
      toast.success('Query send successfully!');
      setQuery('');
      getQueriesList.refetch();
      // setShow(false);
      // queryClient.invalidateQueries(['allRpairRequest']);
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

  useEffect(() => {
    if (chatContainer.current) {
      // const scroll = chatContainer.current.scrollHeight - chatContainer.current.clientHeight;
      // chatContainer.current.scrollTo(0, scroll);
      // console.log(chatContainer.current);
      console.log('kuch chang hua');
      chatContainer.current.scrollTo(0, chatContainer.current.scrollHeight);
    }
  }, [queries]);

  return (
    <OverlayContainer show={show}>
      <ModalForm title={'Queries'} onClose={() => setShow(false)}>
        <div className='flex flex-col gap-y-6'>
          <div
            ref={chatContainer}
            className='flex flex-col text-sm text-primary-2 gap-y-2 max-h-72 overflow-y-scroll no-scrollbar pb-4'
            id='chatbox'>
            {getQueriesList.isLoading && <h3>Loading</h3>}
            {queries.map((query: any) => (
              <span
                key={query.id}
                className={`py-2 px-4 shadow-md rounded-xl w-max max-w-xs ${
                  query.sender_type === 'Vendor' ? 'self-end text-right bg-gray-200' : 'bg-gray-300'
                }`}>
                {query.query}
              </span>
            ))}
          </div>
          {/* <textarea
              name=''
              id='query'
              rows={1}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='rounded-xl outline-none border-2 border-gray-primary-1 p-2'></textarea>
            {submitErrors.includes('query') && (
              <span className='text-sm text-primary-2'>is required</span>
            )} */}

          <div className='flex items-center gap-x-4'>
            <input
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='w-full rounded-xl outline-none border-2 border-gray-primary-1 p-2'
            />
            <PrimaryButton
              title={'Send'}
              classNames={
                'bg-primary-2 px-4 border-2 border-primary-2 text-white py-2 font-semibold hover:bg-[#1f1d66c7]'
              }
              onClick={onSubmit}
              loading={sendQueryApi.isLoading}
            />
          </div>
        </div>
      </ModalForm>
    </OverlayContainer>
  );
};

export default QueryForm;
