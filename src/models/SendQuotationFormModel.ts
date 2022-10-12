import { MutateOptions } from 'react-query';
import { CreateQuotation } from '../api/types';

export interface SendQuotationFormModel {
  show: boolean;
  setShow: (value: boolean) => void;
  row: any;
  setShowCommentForm: (value: boolean) => void;
  setShowScheduleForm: (value: boolean) => void;
  getData?: (
    data: CreateQuotation,
    mutate: (
      variables: CreateQuotation,
      options?: MutateOptions<any, any, CreateQuotation, unknown> | undefined
    ) => Promise<void>
  ) => void;
}
