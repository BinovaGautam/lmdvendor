import { request } from './base';
import { SendInvoice } from './types';

export default class RepairAPI {
  static sendInvoice(data: SendInvoice) {
    return request({
      url: `repair_requests/v1/repair_requests`,
      method: 'get',
      data: data,
    });
  }
}
