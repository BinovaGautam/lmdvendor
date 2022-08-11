import axios from 'axios';
import Env from '../constants/environment';
import { UserModel } from '../models/UserModel';

const baseURL = Env().baseUrl;

const client = axios.create({
  baseURL,
});

export const request = async ({ ...options }) => {
  let user: UserModel | null = null;

  const getItem: string | null = localStorage.getItem('user');

  if (getItem) user = JSON.parse(getItem);

  client.defaults.headers.common['x-access-token'] = user?.token || '';
  client.defaults.headers.common['x-access-user'] = user?.account_id || '';

  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    // optionally catch errors and add additional logging here
    return error;
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};
