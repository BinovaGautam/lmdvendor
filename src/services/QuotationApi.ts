import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fleetRepairConfig } from '../constants/config';

export const quotationApi = createApi({
  reducerPath: 'quotationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${fleetRepairConfig.fleetReapirApiBaseUrl}/quotations/v1/quotations`,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('x-access-token', window.localStorage.getItem('x-access-token') || '');
      headers.set('x-access-user', window.localStorage.getItem('x-access-user') || '');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createQuotation: builder.mutation<any, { body: FormData; repairRequestId: number | string }>({
      query(data) {
        return {
          url: `/${data.repairRequestId}`,
          method: 'POST',
          body: data.body,
        };
      },
    }),
    // listRepairRequests: builder.query<RepairRequestModel[], { role: string }>({
    //   query: (data: any) => ({ url: `?role=${data.role}`, method: 'GET' }),
    //   transformResponse: (response: any) => response.data,
    // }),
  }),
});

export const { useCreateQuotationMutation /* useListRepairRequestsQuery */ } = quotationApi;
