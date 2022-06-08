import { VehicleModel } from './VehicleModel';

export interface RepairRequestModel {
  id: string;
  inspection_report: string;
  damage_report: string;
  notes: string;
  created_at: string;
  updated_at: string;
  repair_type: string;
  severity: string;
  vehicle: VehicleModel;
  quotations?: any[];
}
