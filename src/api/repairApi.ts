import { request } from './base';

export default class RepairAPI {
  static getRepairRequests(status_id: number) {
    return request({
      url: `repair_requests/v1/repair_requests?status_id=${status_id}`,
      method: 'get',
    });
  }
}
