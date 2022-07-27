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
} from '@heroicons/react/solid';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidenav.css';

export default function Sidenav() {
  const [sidenavExpanded, setSidenavExpanded] = useState(true);
  const [menuItems] = useState([
    {
      label: 'Dashboard',
      link: '/app/dashboard',
      icon: <ViewGridIcon className='w-6 h-6' />,
    },
    {
      label: 'Technicians',
      link: '/app/',
      icon: <TruckIcon className='w-6 h-6' />,
    },
    {
      label: 'Vehicle',
      link: '/app/vehicle',
      icon: <TruckIcon className='w-6 h-6' />,
    },
    {
      label: 'Create',
      link: '/app/create-repair-request',
      icon: <ClockIcon className='w-6 h-6' />,
    },
    {
      label: 'Requests',
      link: '/app/repair-requests',
      icon: <ViewGridIcon className='w-6 h-6' />,
    },
    {
      label: 'Requests2',
      link: '/app/repair-requests2',
      icon: <ViewGridIcon className='w-6 h-6' />,
    },
    {
      label: 'Scheduled',
      link: '/app/scheduled',
      icon: <CalendarIcon className='w-6 h-6' />,
    },
    {
      label: 'Profile',
      link: '/app/profile',
      icon: <UserIcon className='w-6 h-6' />,
    },
    {
      label: 'Calender',
      link: '/app/calender',
      icon: <CalendarIcon className='w-6 h-6' />,
    },
    {
      label: 'Reports',
      link: '/app/reports',
      icon: <DocumentReportIcon className='w-6 h-6' />,
    },
    {
      label: 'Setting',
      link: '/app/setting',
      icon: <CogIcon className='w-6 h-6' />,
    },
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
        <img src='../images/logo.svg' className='object-contain w-14 h-14' alt='logo' />
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
