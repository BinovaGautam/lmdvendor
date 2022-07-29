export const PendingTableHeader = [
  {
    title: 'DSP Name',
    key: 'name',
    level2: {
      key: 'dsp',
    },
    type: 'image-string',
  },
  {
    title: 'Van Name',
    key: 'name',
    level2: {
      key: 'vehicle',
    },
    type: 'string',
  },
  {
    title: 'License Plate',
    key: 'plate',
    level2: {
      key: 'vehicle',
    },
    type: 'string',
  },
  {
    title: 'Notes',
    key: 'notes',
    type: 'string',
  },
  {
    title: 'Action',
    key: 'action',
    type: 'button',
    text: 'Send Quote',
    func: 'onClickButton',
    disableState: {
      key: 'quotations',
      isDisable: (data: any) =>
        data?.quotations?.find(
          (quotation: any, index: number) => quotation.vendor_account_id !== data.vender_id
        ),
    },
  },
  {
    title: '',
    key: '',
    type: 'dot-option',
    options: [
      {
        title: 'Queries',
        func: 'onQuery',
      },
    ],
  },
];

export const WaitingApprovalTableHeader = [
  {
    title: 'DSP Name',
    key: 'name',
    level2: {
      key: 'dsp',
    },
    type: 'image-string',
  },
  {
    title: 'Van Name',
    key: 'name',
    level2: {
      key: 'vehicle',
    },
    type: 'string',
  },
  {
    title: 'License Plate',
    key: 'plate',
    level2: {
      key: 'vehicle',
    },
    type: 'string',
  },
  {
    title: 'Repair Details',
    key: 'damage_id',
    type: 'string',
  },
  {
    title: 'Notes',
    key: 'notes',
    type: 'string',
  },
  {
    title: 'Action',
    key: 'action',
    type: 'button',
    text: 'view',
    func: 'onClickButton',
  },
];

export const ApprovedTableHeader = [
  {
    title: 'DSP Name',
    key: 'name',
    level2: {
      key: 'dsp',
    },
    type: 'image-string',
  },
  {
    title: 'Van Name',
    key: 'name',
    level2: {
      key: 'vehicle',
    },
    type: 'string',
  },
  {
    title: 'License Plate',
    key: 'plate',
    level2: {
      key: 'vehicle',
    },
    type: 'string',
  },
  {
    title: 'Damage Id',
    key: 'damage_id',
    type: 'string',
  },
  {
    title: 'Notes',
    key: 'notes',
    type: 'string',
  },
  {
    title: 'Action',
    key: 'action',
    type: 'button',
    text: 'Send Schedule',
    func: 'onClickButton',
    // disableState: {
    //   key: 'quotations',
    //   isDisable: (data: any) =>
    //     data.quotations.find(
    //       (quotation: any, index: number) => quotation.vendor_account_id !== data.vender_id
    //     ),
    // },
  },
];

export const ScheduledTableHeader = [
  {
    title: 'DSP Name',
    key: 'name',
    level2: {
      key: 'dsp',
    },
    type: 'image-string',
  },
  {
    title: 'Van Name',
    key: 'name',
    level2: {
      key: 'vehicle',
    },
    type: 'string',
  },
  {
    title: 'License Plate',
    key: 'plate',
    level2: {
      key: 'vehicle',
    },
    type: 'string',
  },
  {
    title: 'Damage Id',
    key: 'damage_id',
    type: 'string',
  },
  {
    title: 'Notes',
    key: 'notes',
    type: 'string',
  },
  {
    title: 'Status',
    key: 'status',
    type: 'status',
  },
  {
    title: 'Action',
    key: 'action',
    type: 'dot-option',
    options: [
      {
        title: 'Reason for Rejects',
        func: 'onRejectReason',
      },
      {
        title: 'Assign Technician',
        func: 'onAssignTechnician',
      },
      {
        title: 'Add technician',
        func: 'onAddTechnician',
      },
    ],
  },
];

export const InProgressTableHeader = [
  {
    title: 'DSP Name',
    key: 'name',
    level2: {
      key: 'dsp',
    },
    type: 'image-string',
  },
  {
    title: 'Van Name',
    key: 'name',
    level2: {
      key: 'vehicle',
    },
    type: 'string',
  },
  {
    title: 'License Plate',
    key: 'plate',
    level2: {
      key: 'vehicle',
    },
    type: 'string',
  },
  {
    title: 'Estimated Amount',
    key: 'estimated_amount',
    type: 'amount',
  },
  {
    title: 'Action',
    key: 'action',
    type: 'button',
    text: 'view',
    func: 'onClickButton',
  },
];

export const CompletedTableHeader = [
  {
    title: 'DSP Name',
    key: 'name',
    level2: {
      key: 'dsp',
    },
    type: 'image-string',
  },
  {
    title: 'Van Name',
    key: 'name',
    level2: {
      key: 'vehicle',
    },
    type: 'string',
  },
  {
    title: 'License Plate',
    key: 'plate',
    level2: {
      key: 'vehicle',
    },
    type: 'string',
  },
  {
    title: 'Estimated Amount',
    key: 'estimated_amount',
    type: 'amount',
  },
  {
    title: 'Action',
    key: 'action',
    type: 'button',
    text: 'view',
  },
];

export const PaidTableHeader = [
  {
    title: 'DSP Name',
    key: 'name',
    level2: {
      key: 'dsp',
    },
    type: 'image-string',
  },
  {
    title: 'Van Name',
    key: 'name',
    level2: {
      key: 'vehicle',
    },
    type: 'string',
  },
  {
    title: 'License Plate',
    key: 'plate',
    level2: {
      key: 'vehicle',
    },
    type: 'string',
  },
  {
    title: 'Final Amount',
    key: 'final_amount',
    type: 'amount',
  },
  {
    title: 'Status',
    key: 'status',
    type: 'status',
  },
];

export const DemoData = [
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Approved',
    estimated_amount: 200,
    final_amount: 200,
  },
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Pending',
    estimated_amount: 200,
    final_amount: 200,
  },
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Paid',
    estimated_amount: 200,
    final_amount: 200,
  },
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Approved',
    estimated_amount: 200,
    final_amount: 200,
  },
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Pending',
    estimated_amount: 200,
    final_amount: 200,
  },
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Technician Rejects',
    estimated_amount: 200,
    final_amount: 200,
  },
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Approved',
    estimated_amount: 200,
    final_amount: 200,
  },
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Approved',
    estimated_amount: 200,
    final_amount: 200,
  },
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Approved',
    estimated_amount: 200,
    final_amount: 200,
  },
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Technician Rejects',
    estimated_amount: 200,
    final_amount: 200,
  },
];

export const TabMenus = [
  {
    id: 0,
    title: 'Pending',
    header: PendingTableHeader,
  },
  // {
  //   id: 1,
  //   title: 'Waiting for Approval (04)',
  //   header: WaitingApprovalTableHeader,
  // },
  {
    id: 1,
    title: 'Approved',
    header: ApprovedTableHeader,
  },
  {
    id: 2,
    title: 'Scheduled',
    header: ScheduledTableHeader,
  },
  {
    id: 3,
    title: 'In Progress',
    header: InProgressTableHeader,
  },
  {
    id: 4,
    title: 'Completed',
    header: CompletedTableHeader,
  },
  {
    id: 5,
    title: 'Paid',
    header: PaidTableHeader,
  },
];
