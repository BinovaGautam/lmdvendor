import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fleetRepairConfig } from '../constants/config';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${fleetRepairConfig.fleetUsersApiBaseUrl}/users/v2/user`,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('x-access-token', window.localStorage.getItem('x-access-token') || '');
      headers.set('x-access-user', window.localStorage.getItem('x-access-user') || '');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signin: builder.mutation<any, FormData>({
      query(data) {
        return {
          url: `/login`,
          method: 'POST',
          body: data,
        };
      },
    }),
    signup: builder.mutation<any, FormData>({
      query(data) {
        return {
          url: ``,
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const { useSigninMutation, useSignupMutation } = authApi;
