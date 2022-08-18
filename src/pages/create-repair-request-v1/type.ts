export interface IInspection {
  rear_view: string;
  passenger_side_view: boolean;
  clean: boolean;
  mileage: boolean;
  phone_charger: boolean;
  phone: boolean;
  handtruck: boolean;
  parking_ticket: boolean;
  rescue: boolean;
  gas_card: boolean;
  driver_side_view: boolean;
  engine_light: boolean;
  gas: boolean;
  front_view: boolean;
  windshield_fluid: boolean;
}

export interface IDsp {
  id: string;
  company_name: string;
  zipcode: string;
  dsp_short_code: string;
  owner: string;
  address: string;
  owner_name: string;
  station_code: string;
  inspection: IInspection;
}

export interface IVehicle {
  id: string;
  name: string;
  vin: string;
  plate: string;
  is_disabled: boolean;
  vehicle_type: string;
  vehicle_sub_type: string | null;
}
