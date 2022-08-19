import { baseURL, client, request } from './base';
import axios from 'axios';
import {} from './types';
import { UserModel } from '../models/UserModel';

export default class PreventiveAPI {
  static getVehicleList(companies: string[]) {
    const data = JSON.stringify({ companies });

    let user: UserModel | null = null;

    const getItem: string | null = localStorage.getItem('user');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (getItem) user = JSON.parse(getItem);

    const options = {
      method: 'get',
      url: `${baseURL}preventive/v1/maintenance_ready`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': user?.token || '',
        'x-access-user': user?.account_id || '',
      },
      data: data,
    };

    return axios(options);
  }

  static getVehicleListStatic() {
    const data = JSON.stringify({
      companies: ['1', '2'],
    });

    const config = {
      method: 'get',
      url: 'https://fleetmax-api.fleet.lmdmax.com/preventive/v1/maintenance_ready',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    return axios(config);
  }
}
