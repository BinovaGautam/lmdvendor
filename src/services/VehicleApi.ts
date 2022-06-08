import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fleetRepairConfig } from '../constants/config';

import { VehicleModel } from '../models/VehicleModel';

export const vehicleApi = createApi({
  reducerPath: 'vehicleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${fleetRepairConfig.fleetUsersApiBaseUrl}/vehicles/v1/vehicles`,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('x-access-token', window.localStorage.getItem('x-access-token') || '');
      headers.set('x-access-user', window.localStorage.getItem('x-access-user') || '');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    vehicles: builder.query<VehicleModel[], void>({
      query: () => ({ url: `/`, method: 'GET' }),
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const { useVehiclesQuery } = vehicleApi;
