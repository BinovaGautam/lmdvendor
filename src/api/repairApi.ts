import { request } from './base';
import { CreateRepairRequest } from './types';

export default class RepairAPI {
  static getRepairRequests(status_id: number) {
    return request({
      url: `repair_requests/v1/repair_requests?status_id=${status_id}`,
      method: 'get',
    });
  }

  static createRepairRequest(data: CreateRepairRequest) {
    const formData = new FormData();
    // formData.append('vehicle_id', data.vehicle.id);
    // formData.append('repair_type_id', data.repairType.id);
    // formData.append('severity_id', data.severity.id);
    // formData.append('inspection_report', data.prevInspectionReport[0]);
    // formData.append('damage_report', data.currentDamageReport[0]);
    // formData.append('notes', data.notes);

    return request({
      url: `repair_requests/v1/repair_requests`,
      method: 'post',
      data: data,
    });
  }
}
