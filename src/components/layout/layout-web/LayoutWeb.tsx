import { Divider } from 'primereact/divider';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import HeaderMobile from '../header/HeaderMobile';
import MainContent from '../main-content/MainContent';
import Sidenav from '../sidenav/Sidenav';
import './LayoutWeb.css';

export default function LayoutWeb() {
  return (
    <div className='flex flex-row w-full'>
      <div className='hidden lg:block'>
        <Sidenav></Sidenav>
      </div>

      <div className='w-full px-0 lg:px-10 bg-light-secondary'>
        <div className='hidden lg:block'>
          <Header></Header>
        </div>
        <div className='block lg:hidden'>
          <HeaderMobile></HeaderMobile>
        </div>

        <Divider />

        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </div>
  );
}
