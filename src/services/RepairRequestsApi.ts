import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fleetRepairConfig } from '../constants/config';
import { RepairRequestModel } from '../models/RepairRequestModel';

export const repairRequestsApi = createApi({
  reducerPath: 'repairRequestsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${fleetRepairConfig.fleetReapirApiBaseUrl}/repair_requests/v1/repair_requests`,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('x-access-token', window.localStorage.getItem('x-access-token') || '');
      headers.set('x-access-user', window.localStorage.getItem('x-access-user') || '');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createRepairRequest: builder.mutation<any, FormData>({
      query(data) {
        return {
          url: ``,
          method: 'POST',
          body: data,
        };
      },
    }),
    listRepairRequests: builder.query<RepairRequestModel[], { role: string }>({
      query: (data: any) => ({ url: `?role=${data.role}`, method: 'GET' }),
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const { useCreateRepairRequestMutation, useListRepairRequestsQuery } = repairRequestsApi;
