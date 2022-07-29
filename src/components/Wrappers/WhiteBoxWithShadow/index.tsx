import React from 'react';

const WhiteBoxWithShadow = ({
  children,
  classNames,
}: {
  children: JSX.Element;
  classNames: string;
}) => {
  return (
    <div
      className={`rounded-xl ${
        classNames
          ? classNames
          : 'shadow-sm border-[1px] border-table-border-normal overflow-hidden bg-white'
      }`}>
      {children}
    </div>
  );
};

export default WhiteBoxWithShadow;
