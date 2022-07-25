import React, { useState } from 'react';
import { TabBarModel, TabMenuModal } from '../../models/TabBarModel';

const TabBar = ({ menus, active, setActive }: TabBarModel) => {
  return (
    <div className='overflow-hidden rounded-2xl border-[1px] border-gray-300 bg-white w-fit flex items-center'>
      <div className='flex items-center h-full font-semibold text-primary-2'>
        {menus.map((item: TabMenuModal, index: number) => (
          <span
            onClick={() => setActive(item)}
            className={`transition duration-300 px-5 h-full py-3 cursor-pointer ${
              index === 0 && 'pl-10'
            } ${index === menus.length - 1 && 'pr-10'} ${
              active?.id === item.id && 'bg-primary-2 text-white'
            }`}>
            {item.title}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
