import { request } from './base';

export default class RepairAPI {
  static getRepairRequests() {
    return request({
      url: 'repair_requests/v1/repair_requests',
      method: 'get',
    });
  }
}
