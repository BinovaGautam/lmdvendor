import { request } from './base';
import { SignWithEmail } from './types';

export default class AuthAPI {
  static signUpViaMail(data: SignWithEmail) {
    return request({
      url: 'users/v2/user',
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
}
