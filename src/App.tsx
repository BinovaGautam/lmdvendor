import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import LayoutAuth from './components/layout/layout-auth/LayoutAuth';
import LayoutWeb from './components/layout/layout-web/LayoutWeb';
import ForgotPassword from './pages/auth/forgot-password/ForgotPassword';
import ResetPassword from './pages/auth/reset-password/ResetPassword';
import Signin from './pages/auth/signin/Signin';
import Signup from './pages/auth/signup/Signup';
import CreateRepairRequest from './pages/create-repair-request/CreateRepairRequest';
import Dashboard from './pages/dashboard/Dashboard';
import RepairRequests from './pages/repair-requests/RepairRequests';
import RepairRequests2 from './pages/repair-requests2/RepairRequests2';
import RepairShopDetails from './pages/repair-shop-details/RepairShopDetails';
import Technician from './pages/technician/Technician';
import { RootState } from './state/reducers';
import './theme.css';

function App() {
  const { user, loading } = useSelector((state: RootState) => state.userState);

  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className=''>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              user ? (
                <Navigate replace to='/app/dashboard' />
              ) : (
                <Navigate replace to='/auth/signin' />
              )
            }
          />
          {!user ? (
            <Route path='auth' element={<LayoutAuth />}>
              <Route path='signin' element={<Signin />} />
              <Route path='signup' element={<Signup />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
              <Route path='reset-password' element={<ResetPassword />} />
            </Route>
          ) : (
            <Route path='app' element={<LayoutWeb />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='repair-requests' element={<RepairRequests />} />
              <Route path='repair-requests2' element={<RepairRequests2 />} />
              <Route path='create-repair-request' element={<CreateRepairRequest />} />
              <Route path='repair-shop-details' element={<RepairShopDetails />} />
              <Route path='technician' element={<Technician />} />
            </Route>
          )}

          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
