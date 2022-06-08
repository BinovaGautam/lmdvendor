import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fleetRepairConfig } from '../constants/config';
import { RepairTypeModel } from '../models/RepairTypeModel';

export const repairTypesApi = createApi({
  reducerPath: 'repairTypesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${fleetRepairConfig.fleetReapirApiBaseUrl}/utilities/v1/repair_types`,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('x-access-token', window.localStorage.getItem('x-access-token') || '');
      headers.set('x-access-user', window.localStorage.getItem('x-access-user') || '');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    repairTypes: builder.query<RepairTypeModel[], void>({
      query: () => ({ url: `/`, method: 'GET' }),
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const { useRepairTypesQuery } = repairTypesApi;
