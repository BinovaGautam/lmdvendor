import { MutateOptions } from 'react-query';
import { ScheduleAppoinment } from '../api/types';

export interface ScheduleAppointmentFormModel {
  show: boolean;
  setShow: (value: boolean) => void;
  row: any;
  getData?: (
    data: ScheduleAppoinment,
    mutate: (
      variables: ScheduleAppoinment,
      options?: MutateOptions<any, any, ScheduleAppoinment, unknown> | undefined
    ) => Promise<void>
  ) => void;
}
