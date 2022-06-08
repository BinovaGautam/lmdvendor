import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  return (
    <>
      <div className='auth-form signin w-full'>
        <div className='lg:block hidden'>
          <h3 className='text-3xl font-bold text-primary-dark-1 mb-3'>Forgot Password</h3>
          <p className='text-base font-medium text-primary-dark-1 opacity-70 mb-12'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
              Forgot Password
            </h3>
          </figure>
        </div>
        <form className='lg:px-0 px-4'>
          <div className='form-group mb-8'>
            <label htmlFor='email' className='label-v1'>
              Email ID
            </label>
            <div className='p-input-icon-right w-full'>
              <i className='pi pi-envelope' />
              <InputText
                id='email'
                className='input-v1'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
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
