import { request } from './base';
import { IPreventiveSendSchedule, IPreventiveUpdateStatus } from './types';

export default class PreventiveAPI {
  static getVehicleList(companies: string[]) {
    // const data = JSON.stringify({ companies });

    return request({
      url: `preventive/v1/maintenance_ready?companies=${JSON.stringify(companies)}`,
      method: 'get',
    });
  }

  static getPreventiveRequestList() {
    return request({
      url: `pm-request/v1/preventive/requests`,
    });
  }

  static sendSchedule(data: IPreventiveSendSchedule) {
    return request({
      url: `pm-request/v1/preventive/schedule`,
      method: 'post',
      data: data,
    });
  }

  static updateStatus(data: IPreventiveUpdateStatus) {
    return request({
      url: `pm-request/v1/preventive/` + data.id,
      method: 'put',
      data: {
        status_id: data.status,
      },
    });
  }
}
