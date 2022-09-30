import {
  // AcademicCapIcon,
  TruckIcon,
  ClockIcon,
  CalendarIcon,
  UserIcon,
  CogIcon,
  DocumentReportIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ViewGridIcon,
  LogoutIcon,
} from '@heroicons/react/solid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state';
import './Sidenav.css';

export default function Sidenav() {
  const [sidenavExpanded, setSidenavExpanded] = useState(true);
  const dispatch = useDispatch();
  const { deleteUsers } = bindActionCreators(actionCreators, dispatch);
  const [menuItems] = useState([
    {
      label: 'Dashboard',
      link: '/app/dashboard',
      icon: <ViewGridIcon className='w-6 h-6' />,
    },
    {
      label: 'Technicians',
      link: '/app/technician',
      icon: <TruckIcon className='w-6 h-6' />,
    },
    {
      label: 'Create',
      link: '/app/create-repair-request',
      icon: <ClockIcon className='w-6 h-6' />,
    },
    // {
    //   label: 'Profile',
    //   link: '/app/profile',
    //   icon: <UserIcon className='w-6 h-6' />,
    // },
    // {
    //   label: 'Setting',
    //   link: '/app/setting',
    //   icon: <CogIcon className='w-6 h-6' />,
    // },
  ]);

  const toggleSidenav = () => {
    setSidenavExpanded(!sidenavExpanded);
  };

  return (
    <div
      className={`${
        sidenavExpanded ? 'w-64' : 'w-24'
      } bg-primary-contrast text-light min-h-screen flex flex-col transition-all duration-500 sticky top-0 left-0`}>
      {/* ---------------------------- App Logo : Start ---------------------------- */}
      <div className='flex flex-row items-center justify-center mt-8'>
        {/* <AcademicCapIcon className='p-2 text-center rounded-full h-14 w-14 bg-primary' /> */}
        <img className='w-20 h-20' src='../images/vendorlogo.png' alt='fleet logo' />
      </div>
      {/* ----------------------------- App Logo : End ----------------------------- */}

      <nav
        className={`flex-1 flex flex-col justify-start ${
          sidenavExpanded ? 'items-start px-12' : 'items-center px-0'
        }  mt-14 gap-10`}>
        {menuItems.map((item, index) => (
          <NavLink to={item.link} key={index} className='flex flex-row items-center gap-2 navlink'>
            <div className='flex-shrink-0'>{item.icon}</div>
            {sidenavExpanded ? <span className='text-base font-semibold'>{item.label}</span> : null}
          </NavLink>
        ))}

        <div onClick={deleteUsers}  className='flex flex-row items-center gap-2 navlink cursor-pointer '>
          <div className='flex-shrink-0'>
            <LogoutIcon className='w-6 h-6' />
          </div>
          {sidenavExpanded ? <span className='text-base font-semibold'>Logout</span> : null}
        </div>
      </nav>

      {/* ---------------------- Toogle Sidenav Button : Start --------------------- */}
      <div
        className='flex flex-row items-center justify-center w-full mb-4 cursor-pointer'
        onClick={toggleSidenav}>
        {sidenavExpanded ? (
          <ChevronDoubleLeftIcon className='w-6 h-6' />
        ) : (
          <ChevronDoubleRightIcon className='w-6 h-6' />
        )}
      </div>
      {/* ----------------------- Toggle Sidenav Button : End ---------------------- */}
    </div>
  );
}
