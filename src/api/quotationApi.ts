import { request } from './base';
import { CreateQuotation, SendQuery, UpdateQuotation } from './types';

export default class QuotationAPI {
  static createQuotation(data: CreateQuotation) {
    const formData = new FormData();

    formData.append('estimations', JSON.stringify(data.estimations));
    formData.append('vendor_account_id', data.vendor_account_id || '');

    if (data.work_hour) {
      formData.append('work_hour', data.work_hour);
    }

    if (data.quotation) {
      formData.append('quotation', data.quotation);
    }

    return request({
      url: `quotations/v1/quotations/${data.request_id}`,
      method: 'post',
      data: formData,
    });
  }

  static sendQuery(data: SendQuery) {
    return request({
      url: `quotations/v1/quotations/queries`,
      method: 'put',
      data: data,
    });
  }

  static getQueries(request_id: string, quotation_id: string, account_id: string) {
    return request({
      url: `quotations/v1/quotations/queries?repair_request_id=${request_id}&quotation_id=${quotation_id}&account_id=${account_id}`,
      method: 'get',
    });
  }

  static updateQuotation(payload: UpdateQuotation) {
    const { quotation_id, data } = payload;
    const formData = new FormData();

    formData.append('estimations', JSON.stringify(data.estimations));
    if (data.quotation) {
      formData.append('quotation_invoice', data.quotation);
    }

    return request({
      url: `quotations/v1/quotations/${quotation_id}`,
      method: 'patch',
      data: formData,
    });
  }

  static getQuotationByRequestID(request_id: string) {
    return request({
      url: `quotations/v1/quotations?repair_request_id=${request_id}&limit=10&offset=0`,
    });
  }
}
