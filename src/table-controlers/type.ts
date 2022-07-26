export interface ICommon {
  row: any;
}

export interface ISendQuotationControl extends ICommon {}
export interface IQueryControl extends ICommon {}
export interface ISendScheduleControl extends ICommon {}
export interface ITechnicianControl extends ICommon {
  type: string;
}

export interface IStatusControl extends ICommon {
  type: string;
}
