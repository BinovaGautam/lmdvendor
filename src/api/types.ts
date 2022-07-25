export interface SignWithEmail {
  name: string;
  phone: string;
  password: string;
  email: string;
}

export interface LoginWithEmail {
  password: string;
  email: string;
}

export interface IInspection {
  mileage: boolean;
  gas: boolean;
  front_view: boolean;
  driver_side_view: boolean;
  passenger_side_view: boolean;
  rear_view: boolean;
  handtruck: boolean;
  clean: boolean;
  phone: boolean;
  phone_charge: boolean;
  rescue: boolean;
  gas_card: boolean;
  engine_light: boolean;
  parking_ticket: boolean;
  windshield_fluid: boolean;
}

export interface AddCompany {
  company_name: string;
  owner_name: string;
  dsp_short_code: string;
  address: string;
  zipcode: string;
  station_code: string;
  inspection: IInspection;
}

export interface AddVehicle {
  name: string;
  vin: string;
  plate: string;
  state: string;
  make: string;
  model: string;
  trim: string;
  gas_card: string;
  year: string;
}
