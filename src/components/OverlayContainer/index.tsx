import React from 'react';
import { OverlayContainerModel } from '../../models/OverlayContainerModel';

const OverlayContainer = ({ children, show }: OverlayContainerModel) => {
  return (
    <div
      className={`fixed z-30 h-screen w-full top-0 left-0 bg-primary-2 bg-opacity-50 transition ease-in-out delay-150 duration-300 ${
        !show && 'hidden'
      }`}>
      {children}
    </div>
  );
};

export default OverlayContainer;
