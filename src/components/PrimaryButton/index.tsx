import React from 'react';
import { PrimaryButtonModel } from '../../models/PrimaryButtonModal';

const PrimaryButton = ({ title, classNames, onClick }: PrimaryButtonModel) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl flex items-center justify-center ${
        classNames ? classNames : 'border-none outline-none bg-primary-2 text-white'
      }`}>
      {title}
    </button>
  );
};

export default PrimaryButton;
