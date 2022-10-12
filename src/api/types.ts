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

// Repair Shop Api

export interface IVendor {
  account_id: string;
}

// export interface ICreateRepairRequest {
//   vehicle_id: number;
//   company: string;
//   notes: string;
//   date_time_slots: IdateTimeSlot[];
// }

export interface IdateTimeSlot {
  date: string;
  time: string;
}

export interface ScheduleAppoinment {
  vendor_account_id: string;
  date_time_slots: IdateTimeSlot[];
  request_id: string;
}

// Quotation API

interface IEstimations {
  amount: string;
  creator_message?: string;
  message?: string;
  approved_by?: string;
  approver_message?: string;
}

export interface CreateQuotation {
  estimations: IEstimations[];
  work_hour?: string;
  quotation?: File;
  vendor_account_id: string;
  request_id: string;
}

export interface SendQuery {
  repair_request_id: string;
  quotation_id: string;
  query: string;
  sender_type: string;
}

export interface UpdateQuotation {
  data: {
    quotation?: File;
    estimated_amount: string;
  };
  quotation_id: string;
}

// TechniciansAPI
export interface SignUpTechnician extends SignWithEmail {
  vendor_account_id: string;
}

export interface GetAllTechnicians {
  vendor_account_id: string;
}

export interface ITechnicianId {
  technician_account_id: string;
}

export interface AssignTechnicians {
  repair_request_id: number;
  vendor_account_id: string;
  technicians: ITechnicianId[];
}

export interface IAssignTechniciansPreventive {
  preventive_request_id: number;
  vendor_account_id: string;
  technicians: ITechnicianId[];
}

export interface AcceptRepairRequest {
  repair_request_id: number;
  vendor_account_id: string;
  technician_account_id: string;
}

export interface DenyRepairRequest extends AcceptRepairRequest {
  deny_remarks: string;
}

// Repair API

export interface SendInvoice {
  repair_request_id: string;
  final_payment: string;
  final_invoice: File;
}

export interface SendPayment {
  repair_request_id: string;
  payment_type: string;
  payment_notes: string;
}

export interface UpdateStatus {
  request_id: number;
  status_id: number;
}

export interface ICreateRepairRequest {
  vehicle_id: number;
  company: string;
  notes: string;
  date_time_slots: IdateTimeSlot[];
}

// ==================: Preventive Types :================
export interface IPreventiveSendSchedule {
  company: string;
  created_by: string;
  date_time_slots: IdateTimeSlot[];
  vehicle: string;
}

export interface IPreventiveUpdateStatus {
  id: number;
  status: number;
}
