import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
};

export default function PanelWrapper({ children, className }: Props) {
  return <div className={'border rounded-xl bg-white' + className}>{children}</div>;
}
