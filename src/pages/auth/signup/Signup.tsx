import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import AuthAPI from '../../../api/authApi';
import { SignWithEmail } from '../../../api/types';

interface ISignupFormInputs {
  name: string;
  email: string;
  password: string;
  cPassword: string;
}

const schema = yup
  .object({
    name: yup.string().min(3).required(),
    email: yup.string().min(5).email('Invalid email format').required(),
    password: yup.string().min(8).required(),
    cPassword: yup
      .string()
      .min(8)
      .required()
      .test('cPassword', 'Passwords mismatched', (value, schemaObj) => {
        return value === schemaObj.parent.password;
      }),
  })
  .required();

export default function Signup() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISignupFormInputs>({
    resolver: yupResolver(schema),
  });

  const SignUpApi = useMutation(
    'signupwithemail',
    async (data: SignWithEmail) => await AuthAPI.signUpViaMail(data),
    {
      onSuccess: (response: any) => {
        console.log({ response });
      },
      onError: (error: any) => {
        console.log({ error });
      },
    }
  );

  const onSubmitHandler = (data: any) => {
    // SignUpApi.mutate(data);
  };

  return (
    <>
      <div className='w-full auth-form signin'>
        <div className='hidden lg:block'>
          <h3 className='mb-3 text-3xl font-bold text-primary-dark-1'>Register</h3>
          <p className='mb-12 text-base font-medium text-primary-dark-1 opacity-70'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum
            has been the industry's standard.
          </p>
        </div>
        <div className='flex items-center justify-center mb-10 lg:hidden auth-bg-mobile'>
          <figure className='relative w-full'>
            <img
              src='../images/auth-bg-v1-mobile.svg'
              alt='bg-auth'
              className='object-cover w-full h-auto'
            />
            <h3 className='absolute mb-3 text-3xl font-bold -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-light whitespace-nowrap'>
              Register
            </h3>
          </figure>
        </div>
        <form className='px-4 lg:px-0' onSubmit={handleSubmit(onSubmitHandler)}>
          <div className='mb-5 form-group'>
            <label htmlFor='name' className='label-v1'>
              Name
            </label>
            <div className='w-full'>
              <Controller
                control={control}
                name='name'
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    id='name'
                    className='input-v1'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </div>
            <p>{errors.name?.message}</p>
          </div>
          <div className='mb-5 form-group'>
            <label htmlFor='email' className='label-v1'>
              Email ID
            </label>
            <div className='w-full p-input-icon-right'>
              <i className='pi pi-envelope' />
              <Controller
                control={control}
                name='email'
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputText
                    id='email'
                    className='input-v1'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </div>
            <p>{errors.email?.message}</p>
          </div>
          <div className='mb-5 form-group'>
            <label htmlFor='password' className='label-v1'>
              New Password
            </label>
            <div className='w-full'>
              <Controller
                control={control}
                name='password'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Password
                    id='password'
                    className='input-v1'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    toggleMask
                  />
                )}
              />
            </div>
            <p>{errors.password?.message}</p>
          </div>
          <div className='mb-8 form-group'>
            <label htmlFor='cPassword' className='label-v1'>
              Confirm New Password
            </label>
            <div className='w-full'>
              <Controller
                control={control}
                name='cPassword'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Password
                    id='cPassword'
                    className='input-v1'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    toggleMask
                  />
                )}
              />
            </div>
            <p>{errors.cPassword?.message}</p>
          </div>
          <div className='text-right'>
            <button type='submit' className='btn-primary'>
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className='mt-10 mb-4 text-center lg:mt-20 auth-link'>
        Already have an account?
        <Link to='/auth/signin' className='ml-1 font-bold text-primary-2'>
          Login
        </Link>
      </div>
    </>
  );
}
