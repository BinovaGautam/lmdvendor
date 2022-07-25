export interface UserModel {
  email?: string;
  role?: string;
  name?: string;
  account_id: string;
  phone?: string;
  is_phone_verfified?: boolean;
  dob?: string | null;
  is_visible?: boolean;
  is_visible_fleet?: boolean;
  is_visible_perf?: boolean;
  company?: boolean;
  token: string;
  device_id?: string;
  device_session?: string;
}

export interface UserStateModel {
  user: UserModel | null;
  loading: boolean;
}
