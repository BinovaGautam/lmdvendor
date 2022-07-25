export interface PrimaryButtonModel {
  title: string;
  classNames: string;
  onClick: () => void;
  type?: 'reset' | 'button' | 'submit';
  loading?: boolean;
}
