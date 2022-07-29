import { PrimaryTableHeadModal } from './PrimaryTableModal';

export interface TabMenuModal {
  id: number;
  title: string;
  key: string;
  header: PrimaryTableHeadModal[];
}

export interface TabBarModel {
  menus: TabMenuModal[];
  active: TabMenuModal | undefined;
  setActive: (item: TabMenuModal) => void;
}
