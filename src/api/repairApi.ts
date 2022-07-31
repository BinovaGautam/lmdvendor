import { request } from './base';
import { SendInvoice, SendPayment } from './types';

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
}
