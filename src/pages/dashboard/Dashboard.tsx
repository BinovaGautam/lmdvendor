import { Dropdown } from 'primereact/dropdown';
import React, { useState } from 'react';
import { dashboardFilterTwo, dashboardPages } from './data';
import PremitiveMaintenance from './PremitiveMaintenance';
import RepairRequest from './RepairRequest';

const Dashboard = () => {
  const [pageContent, setPageContent] = useState<any>(dashboardPages[0]);
  const [filterTwo, setFilterTwo] = useState<any>(dashboardFilterTwo[0]);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <div className='h-full grid grid-cols-1 gap-y-5 pb-5 place-content-start'>
      <div className='row-between'>
        <h2 className='h2-heading'>{pageContent.pageTitle}</h2>
        <div className='row gap-x-4'>
          <span className='font-bold text-primary-2 tracking-wide'>Filter: </span>
          <Dropdown
            value={pageContent}
            options={dashboardPages}
            onChange={(e: { value: any }) => setPageContent(e.value)}
            optionLabel='name'
            className='rounded-xl font-bold text-primary-2 [&>span]:text-primary-2'
          />
          <Dropdown
            value={filterTwo}
            options={dashboardFilterTwo}
            onChange={(e: { value: any }) => setFilterTwo(e.value)}
            optionLabel='name'
            className='rounded-xl text-primary-2 [&>span]:text-primary-2 font-semibold'
          />
        </div>
      </div>
      {pageContent.code === 'RP' && (
        <RepairRequest showDetails={showDetails} setShowDetails={setShowDetails} />
      )}
      {pageContent.code === 'PM' && (
        <PremitiveMaintenance showDetails={showDetails} setShowDetails={setShowDetails} />
      )}
    </div>
  );
};

export default Dashboard;
