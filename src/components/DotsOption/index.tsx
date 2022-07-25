/* eslint-disable jsx-a11y/anchor-is-valid */
/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import { DotsOptionModel } from '../../models/DotsOptionModel';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function DropOption({ options, row, actions }: DotsOptionModel) {
  return (
    <Menu as='div' className='relative inline-block text-center'>
      <div>
        <Menu.Button className=''>
          <DotsVerticalIcon className='h-5 w-5' aria-hidden='true' />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'>
        <Menu.Items className='origin-top-right z-10 absolute -right-2 mt-2 w-max'>
          <div className='relative content-none ring-2 ring-gray-primary-1 rounded-xl after:absolute after:border-l-[1px] after:border-l-gray-300 after:border-t-[1px] after:border-t-gray-300 after:bg-white after:h-4 after:w-4 after:-top-[.615rem] after:right-4 after:rotate-45'>
            <div className='rounded-xl overflow-hidden'>
              {options?.map((option: any, index: number) => (
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href='#'
                      onClick={() => {
                        if (option.func) {
                          if (actions[option.func]) {
                            actions[option.func](row);
                          }
                        }
                      }}
                      className={classNames(
                        'block px-5 py-2 text-sm bg-white ring-2 ring-primary-2 text-primary-2 ring-opacity-5'
                      )}>
                      {option.title}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
