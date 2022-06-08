import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import KeyValue from '../../components/key-value/KeyValue';
import { RepairRequestModel } from '../../models/RepairRequestModel';
import { useListRepairRequestsQuery } from '../../services/RepairRequestsApi';
import './RepairRequests.css';

export default function RepairRequests() {
  const { data: repairRequests } = useListRepairRequestsQuery({ role: 'admin' });

  return (
    <section className='pr-0 lg:pr-12'>
      <header className='text-[22px] font-semibold tracking-wider text-dark-primary-2 text-center lg:text-left'>
        Your Request
      </header>

      <main className='flex flex-col gap-6 my-5 lg:gap-4'>
        {(repairRequests || []).map((repairRequest: RepairRequestModel) => (
          <div
            key={repairRequest.id}
            className='flex flex-col justify-between flex-1 gap-4 p-0 border border-solid lg:p-5 rounded-3xl smbg-white item-start lg:items-center lg:flex-row border-table-border-normal'>
            <div className='flex flex-row items-center gap-3 p-5 lg:p-0 lg:bg-transparent bg-bg-color-1 rounded-t-3xl'>
              <Avatar
                image='https://play-lh.googleusercontent.com/-x4PqBRqkt7TUPlqBhD2T4KrFpJ7DDViz0ve2wTKh0491Leh-MMNvjhlHihwXO7JlrE=s256-rw'
                className=''
                size='large'
                shape='circle'
              />
              <div className='flex flex-col'>
                <h2 className='text-lg font-semibold text-dark-primary-3'>
                  {repairRequest.vehicle.name}
                </h2>
                <h3>
                  {repairRequest.vehicle.year} | {repairRequest.vehicle.make}
                </h3>
              </div>
            </div>

            <div className='flex-1 p-5 border-b lg:p-0 lg:border-b-0 border-table-border-normal'>
              <KeyValue keyText={'Service'} valueText={repairRequest.repair_type} />
            </div>

            <div className='flex-1 p-5 border-b lg:p-0 lg:border-b-0 border-table-border-normal'>
              <KeyValue keyText={'Notes'} valueText={repairRequest.notes} />
            </div>

            <div className='flex-1 p-5 lg:p-0'>
              <KeyValue keyText={'Severity'} valueText={repairRequest.severity} />
            </div>

            <div className='p-5 w-36 lg:p-0'>
              <Button label='View Quote' className='rounded-lg p-button-outlined view-quote-btn' />
            </div>
          </div>
        ))}
      </main>

      <footer></footer>
    </section>
  );
}
