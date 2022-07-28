import { request } from './base';
import {
  GetAllTechnicians,
  AssignTechnicians,
  LoginWithEmail,
  SignUpTechnician,
  AcceptRepairRequest,
  DenyRepairRequest,
  ITechnicianId,
} from './types';

export default class TechnicianAPI {
  static loginViaEmail(data: LoginWithEmail) {
    return request({
      url: 'users/v2/user/login',
      method: 'post',
      data: data,
    });
  }

  static signUpTechnician(data: SignUpTechnician) {
    return request({
      url: `users/v1/technician`,
      method: 'post',
      data: data,
    });
  }

  static getAllTechnicians(data: GetAllTechnicians) {
    return request({
      url: `technicians/v1/technicians?vendor_account_id=${data.vendor_account_id}`,
      method: 'get',
    });
  }

  static assignTechnician(data: AssignTechnicians) {
    return request({
      url: `technicians/v1/technicians/assign_technician`,
      method: 'post',
      data: data,
    });
  }

  static acceptRepairRequest(data: AcceptRepairRequest) {
    return request({
      url: `technicians/v1/technicians/accept_repair_request`,
      method: 'patch',
      data: data,
    });
  }

  static denyRepairRequest(data: DenyRepairRequest) {
    return request({
      url: 'technicians/v1/technicians/deny_repair_request',
      method: 'patch',
      data: data,
    });
  }

  static getAssignedRepairRequest(data: ITechnicianId) {
    return request({
      url: `technicians/v1/technicians/repair_requests?technician_account_id=${data.technician_account_id}`,
      method: 'get',
    });
  }
}
