import React from 'react'
import { AppointMentModel } from '../../models/AppointmentModel'
import moment from 'moment'

type Props = {
  appointments : AppointMentModel[]
}

export default function index({appointments}: Props) {
  return (
    <div>
      <p className=' font-semibold text-primary-2'>Appointment Date</p>
      <div className='flex flex-wrap w-full bg-red'>
          {appointments?.length > 0 ? (
            appointments.map((appointment: AppointMentModel, index: number) => {
              let { date, time } = appointment;
              return (
                <div className='h-24 w-52 bg-white shadow-sm rounded-lg border flex justify-center items-center flex-col m-2'>
                  <p className='text-lg font-semibold text-primary-2 mb-1'>
                    {moment(date).format('DD/MM/YYYY')}
                  </p>
                  <p className=' font-normal text-primary-2'>
                    {moment(time, 'HH:mm:ss').format('hh:mm a')}
                  </p>
                </div>
              );
            })
          ) : (
            <div className='text-md p-2'>No Appointments</div>
          )}

      </div>
    </div>
  );
}