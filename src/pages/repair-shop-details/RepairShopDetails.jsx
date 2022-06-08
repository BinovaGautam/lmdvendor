import React from 'react';
import { LocationMarkerIcon, PhoneIcon, MailIcon, CheckCircleIcon } from '@heroicons/react/solid';

const RepairShopDetails = () => {
  return (
    <div className='flex flex-col w-full"'>
      <h1 class='text-2xl font-semibold capitalize text-dark-primary-2'>Repair Shop Details</h1>
      {/* <div className='pt-10 pb-12 pl-4 pr-6 mt-8 border border-divider-color rounded-2xl'></div> */}
      <div className='flex items-stretch gap-5 pt-10'>
        {/* ----------------------------- left container ----------------------------- */}
        <div className='w-1/3 p-8 border border-divider-color rounded-3xl'>
          <div className='flex items-center mb-5 gap-x-8'>
            <figure className='w-[131px] h-[120]'>
              <img
                src='../images/shop-banner.png'
                alt='shop banner'
                className='object-fill w-full h-full rounded-2xl'
              />
            </figure>
            <div className='flex flex-col font-medium gap-y-3 text-dark-primary'>
              <h3 className='text-xl'>Shop Name</h3>
              <span className='text-base'>Open-</span>
              <p className='text-base'>
                Esteblisted Date - <span>10/15/2012</span>
              </p>
            </div>
          </div>
          <div className='border border-divider-color rounded-3xl'>
            <div className='flex flex-row items-start px-5 py-3 border-b gap-x-3 border-divider-color'>
              <LocationMarkerIcon className='flex-shrink-0 w-5 h-5' />

              <div className='flex flex-col gap-1'>
                <span className='text-base font-medium text-primary-dark-1'>Location</span>
                <p className='text-lg font-semibold text-dark-primary'>
                  1901 Thornridge Cir. Shiloh, Hawaii 81063
                </p>
              </div>
            </div>
            <div className='flex flex-row items-start px-5 py-3 border-b gap-x-3 border-divider-color'>
              <PhoneIcon className='flex-shrink-0 w-5 h-5' />
              <div className='flex flex-col gap-1'>
                <span className='text-base font-medium text-primary-dark-1'>Contact Number</span>
                <p className='text-lg font-semibold text-dark-primary'>(505) 555-0125</p>
              </div>
            </div>
            <div className='flex flex-row items-start px-5 py-3 border-b gap-x-3 border-divider-color'>
              <MailIcon className='flex-shrink-0 w-5 h-5' />

              <div className='flex flex-col gap-1'>
                <span className='text-base font-medium text-primary-dark-1'>Email</span>
                <p className='text-lg font-semibold text-dark-primary'>curtis.weaver@example.com</p>
              </div>
            </div>
            <div className='flex flex-row items-start px-5 py-3 border-b gap-x-3 border-divider-color'>
              <MailIcon className='flex-shrink-0 w-5 h-5' />

              <div className='flex flex-col gap-1'>
                <span className='text-base font-medium text-primary-dark-1'>Experince</span>
                <p className='text-lg font-semibold text-dark-primary'>5 Year </p>
              </div>
            </div>
            <div className='flex flex-row items-start px-5 py-3 pb-10 gap-x-3'>
              <CheckCircleIcon className='flex-shrink-0 w-5 h-5' />
              <div className='flex flex-col gap-1'>
                <span className='text-base font-medium text-primary-dark-1'>Availability</span>
                <div className='flex flex-wrap items-start gap-x-2 gap-y-3'>
                  <div className='p-2 text-sm font-medium rounded-lg text-primary-dark-1 bg-gray-primary-1'>
                    10:30 AM
                  </div>
                  <div className='p-2 text-sm font-medium rounded-lg text-primary-dark-1 bg-gray-primary-1'>
                    10:30 AM
                  </div>
                  <div className='p-2 text-sm font-medium rounded-lg text-primary-dark-1 bg-gray-primary-1'>
                    10:30 AM
                  </div>
                  <div className='p-2 text-sm font-medium rounded-lg text-primary-dark-1 bg-gray-primary-1'>
                    10:30 AM
                  </div>
                  <div className='p-2 text-sm font-medium rounded-lg text-primary-dark-1 bg-gray-primary-1'>
                    10:30 AM
                  </div>
                  <div className='p-2 text-sm font-medium rounded-lg text-primary-dark-1 bg-gray-primary-1'>
                    10:30 AM
                  </div>
                  <div className='p-2 text-sm font-medium rounded-lg text-primary-dark-1 bg-gray-primary-1'>
                    10:30 AM
                  </div>
                  <div className='p-2 text-sm font-medium rounded-lg text-primary-dark-1 bg-gray-primary-1'>
                    10:30 AM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ----------------------------- right contianer ---------------------------- */}
        <div className='w-2/3 p-8 border border-divider-color rounded-3xl'>
          <div className='pb-6 mb-4 border-b border-gray-primary-1'>
            <h3 className='mb-2 text-xl font-semibold text-dark-primary-2'>About us</h3>
            <p className='text-base font-normal text-primary-dark-1'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged.
            </p>
          </div>
          <div className='pb-6 mb-4 border-b border-gray-primary-1'>
            <h3 className='mb-2 text-xl font-semibold text-dark-primary-2'>Services</h3>
            <p className='text-base font-normal text-primary-dark-1'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className='pb-6 mb-4 border-b border-gray-primary-1'>
            <h3 className='mb-2 text-xl font-semibold text-dark-primary-2'>Our Facelitiy</h3>
            <p className='text-base font-normal text-primary-dark-1'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className='pb-6 mb-4'>
            <h3 className='mb-2 text-xl font-semibold text-dark-primary-2'>Our Team </h3>
            <div className='flex items-start gap-8'>
              <figure className='w-[157px] h-[110px]'>
                <img
                  src='../images/team-member_1.png'
                  alt='Team member'
                  className='object-fill w-full h-full rounded-lg'
                />
              </figure>
              <figure className='w-[157px] h-[110px]'>
                <img
                  src='../images/team-member_2.png'
                  alt='Team member'
                  className='object-fill w-full h-full rounded-lg'
                />
              </figure>
              <figure className='w-[157px] h-[110px]'>
                <img
                  src='../images/team-member_3.png'
                  alt='Team member'
                  className='object-fill w-full h-full rounded-lg'
                />
              </figure>
              <figure className='w-[157px] h-[110px]'>
                <img
                  src='../images/team-member_4.png'
                  alt='Team member'
                  className='object-fill w-full h-full rounded-lg'
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairShopDetails;

