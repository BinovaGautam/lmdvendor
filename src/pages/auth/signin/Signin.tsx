import { yupResolver } from '@hookform/resolvers/yup';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

interface ISigninFormInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().min(5).email('Invalid email format').required(),
    password: yup.string().min(8).required(),
  })
  .required();

export default function Signin(props: any) {
  const navigate = useNavigate();
  const [signinResponse, setSigninResponse] = useState(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISigninFormInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (signinResponse) {
      navigate('/app/dashboard');
    }
  }, [signinResponse]);

  const onSubmitHandler = (data: any) => {};

  return (
    <>
      <div className='w-full auth-form signin'>
        <div className='hidden lg:block'>
          <h3 className='mb-3 text-3xl font-bold text-primary-dark-1'>Login</h3>
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
              Login
            </h3>
          </figure>
        </div>
        <form className='px-4 lg:px-0' onSubmit={handleSubmit(onSubmitHandler)}>
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
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <p>{errors.email?.message}</p>
          </div>
          <div className='mb-8 form-group'>
            <label htmlFor='password' className='label-v1'>
              Password
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
            <a
              href='#fixme'
              className='block mt-3 text-base font-medium text-right text-primary-dark-1 opacity-70'>
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
      <div className='mt-20 text-center auth-link'>
        Don't have an account?
        <Link to='/auth/signup' className='ml-1 font-bold text-primary-2'>
          Register here
        </Link>
      </div>
    </>
  );
}
