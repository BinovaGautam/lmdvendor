import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fleetRepairConfig } from '../constants/config';
import { RepairTypeModel } from '../models/RepairTypeModel';

export const vehicleServeritiesApi = createApi({
  reducerPath: 'vehicleServeritiesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${fleetRepairConfig.fleetReapirApiBaseUrl}/utilities/v1/severities`,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('x-access-token', window.localStorage.getItem('x-access-token') || '');
      headers.set('x-access-user', window.localStorage.getItem('x-access-user') || '');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    severities: builder.query<RepairTypeModel[], void>({
      query: () => ({ url: `/`, method: 'GET' }),
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const { useSeveritiesQuery } = vehicleServeritiesApi;
