import axios from 'axios';
import Env from '../constants/environment';

const baseURL = Env().baseUrl;

const client = axios.create({
  baseURL,
});

export const request = async ({ ...options }) => {
  client.defaults.headers.common['x-access-token'] = localStorage.getItem('x-access-token') || '';
  client.defaults.headers.common['x-access-user'] = localStorage.getItem('x-access-user') || '';

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
