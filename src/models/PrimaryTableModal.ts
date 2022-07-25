export interface PrimaryTableHeadModal {
  options?: any;
  text?: string;
  title: string;
  key: string;
  type: string;
  func?: string;
  level2?: { key: string };
}

export interface PrimaryTableModel {
  header: PrimaryTableHeadModal[];
  data: any[] | undefined;
  type: string;
  classNames: string;
  level: number;
  actions?: any;
  loading: boolean;
}
