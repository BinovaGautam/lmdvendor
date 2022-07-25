import { Divider } from 'primereact/divider';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../../../state/reducers';
import Header from '../header/Header';
import HeaderMobile from '../header/HeaderMobile';
import MainContent from '../main-content/MainContent';
import Sidenav from '../sidenav/Sidenav';
import './LayoutWeb.css';

export default function LayoutWeb() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.userState);

  return (
    <div className='flex w-full h-screen overflow-hidden'>
      <div className='hidden lg:block h-screen overflow-y-scroll no-scrollbar'>
        <Sidenav />
      </div>

      <div className='w-full pb-5 px-0 lg:px-10 bg-light-secondary min-h-screen overflow-y-scroll'>
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
