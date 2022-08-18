import { request } from './base';
import { SendInvoice, SendPayment, UpdateStatus, ICreateRepairRequest } from './types';

export default class RepairAPI {
  static sendInvoice(data: SendInvoice) {
    const formData = new FormData();
    formData.append('final_payment', data.final_payment);
    formData.append('final_invoice', data.final_invoice);
    formData.append('repair_request_id', data.repair_request_id);

    return request({
      url: `repair_requests/v1/repair_requests/send_invoice`,
      method: 'post',
      data: formData,
    });
  }

  static sendPayment(data: SendPayment) {
    return request({
      url: `repair_requests/v1/repair_requests/payments`,
      method: 'post',
      data: data,
    });
  }

  static updateStatus(data: UpdateStatus) {
    return request({
      url: `repair_requests/v1/repair_requests/${data.request_id}`,
      method: 'put',
      data: { status_id: data.status_id },
    });
  }

  static createRepairRequest(data: ICreateRepairRequest) {
    return request({
      url: `repair_requests/v1/repair_requests/vendor`,
      method: 'post',
      data: data,
    });
  }
}
