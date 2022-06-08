import React, { useState } from 'react';
import { Password } from 'primereact/password';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <div className='auth-form signin w-full'>
        <div className='lg:block hidden'>
          <h3 className='text-3xl font-bold text-primary-dark-1 mb-3'>Forget Password </h3>
          <p className='text-base font-medium text-primary-dark-1 opacity-70 mb-12'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum
            has been the industry's standard.
          </p>
        </div>
        <div className='lg:hidden auth-bg-mobile flex items-center justify-center mb-10'>
          <figure className='w-full relative'>
            <img
              src='../images/auth-bg-v1-mobile.svg'
              alt='bg-auth'
              className='object-cover w-full h-auto'
            />
            <h3 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-light mb-3 whitespace-nowrap'>
              Forget Password
            </h3>
          </figure>
        </div>
        <form className='lg:px-0 px-4'>
          <div className='form-group mb-5'>
            <label htmlFor='newPassword' className='label-v1'>
              New Password
            </label>
            <div className='w-full'>
              <Password
                id='newPassword'
                className='input-v1'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                toggleMask
              />
            </div>
          </div>
          <div className='form-group mb-8'>
            <label htmlFor='password' className='label-v1'>
              Confirm New Password
            </label>
            <div className='w-full'>
              <Password
                id='password'
                className='input-v1'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                toggleMask
              />
            </div>
            <a
              href='#fixme'
              className='text-base font-medium text-primary-dark-1 opacity-70 block text-right mt-3'>
              Forget Password ?
            </a>
          </div>
          <div className='text-right'>
            <button type='submit' className='btn-primary'>
              Sign In
            </button>
          </div>
        </form>
      </div>
      <div className='auth-link text-center mt-20'>
        Don’t have an account?
        <a href='#fixme' className='text-primary-2 font-bold ml-1'>
          Register here
        </a>
      </div>
    </>
  );
}
