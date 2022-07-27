import { request } from './base';
import { CreateQuotation } from './types';

export default class QuotationAPI {
  static createQuotation(data: CreateQuotation) {
    const formData = new FormData();

    formData.append('estimate_amount', data.estimate_amount);
    formData.append('work_hour', data.work_hour);
    formData.append('vendor_account_id', data.vendor_account_id || '');
    if (data.quotation) {
      formData.append('quotation', data.quotation);
    }

    return request({
      url: `quotations/v1/quotations/${data.request_id}`,
      method: 'post',
      data: formData,
    });
  }
}
