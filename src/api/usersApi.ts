import { request } from './base';
import { AddCompany, AddVehicle, LoginWithEmail, SignWithEmail } from './types';

export default class AuthAPI {
  static signUpViaMail(data: SignWithEmail) {
    return request({
      url: 'users/v1/repair_shop_owners',
      method: 'post',
      data: data,
    });
  }

  static signUpRepairShop(data: SignWithEmail) {
    return request({
      url: 'users/v1/repair_shop_owners',
      method: 'post',
      data: data,
    });
  }

  static loginWithEmail(data: LoginWithEmail) {
    return request({
      url: 'users/v2/user/login',
      method: 'post',
      data: data,
    });
  }

  static addCompany(data: AddCompany) {
    return request({
      url: 'companies/v1/company',
      method: 'post',
      data: data,
    });
  }

  static addVehicle(data: AddVehicle) {
    return request({
      url: 'companies/v1/vehicle',
      method: 'post',
      data: data,
    });
  }

  static getRepairShopOwners() {
    return request({
      url: 'companies/v1/companies',
    });
  }

  static getVehicles(company_id: string, limit: string, offset: string) {
    return request({
      url: `vehicles/v1/vehicles/company?company_id=${company_id}&limit=${limit}&offset=${offset}`,
    });
  }
}
