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
    key: 'status_id',
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
    level2: {
      key: 'quotations',
    },
    type: 'amount-level2',
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
    level2: {
      key: 'quotations',
    },
    type: 'amount-level2',
  },
  {
    title: 'Action',
    key: 'action',
    type: 'button',
    text: 'view',
    func: 'onClickButton',
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
    key: 'final_payment',
    type: 'amount',
  },
  {
    title: 'Status',
    key: 'status_id',
    type: 'status',
  },
];

export const demoDataHeader = [
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

export const DemoData = [
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Approved',
    estimated_amount: 200,
    final_payment: 200,
  },
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Pending',
    estimated_amount: 200,
    final_payment: 200,
  },
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Paid',
    estimated_amount: 200,
    final_payment: 200,
  },
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Approved',
    estimated_amount: 200,
    final_payment: 200,
  },
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Pending',
    estimated_amount: 200,
    final_payment: 200,
  },
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Technician Rejects',
    estimated_amount: 200,
    final_payment: 200,
  },
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Approved',
    estimated_amount: 200,
    final_payment: 200,
  },
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Approved',
    estimated_amount: 200,
    final_payment: 200,
  },
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Approved',
    estimated_amount: 200,
    final_payment: 200,
  },
  {
    dsp_name: 'Binova Gautam',
    van_name: 'Lorem Ipsum is simply',
    license_plate: '4339',
    repair_details: 'Lorem Ipsum is simply',
    notes: 'Lorem Ipsum is simply',
    status: 'Technician Rejects',
    estimated_amount: 200,
    final_payment: 200,
  },
];

export const RepairTabMenus = [
  // {
  //   id: 0,
  //   title: 'Pending',
  //   key: 'pending',
  //   header: PendingTableHeader,
  // },
  // {
  //   id: 1,
  //   title: 'Waiting for Approval (04)',
  //   header: WaitingApprovalTableHeader,
  // },
  // {
  //   id: 1,
  //   title: 'Approved',
  //   key: 'approved',
  //   header: ApprovedTableHeader,
  // },
  {
    id: 2,
    title: 'Scheduled',
    key: 'scheduled',
    header: ScheduledTableHeader,
  },
  {
    id: 3,
    title: 'In Progress',
    key: 'inProgress',
    header: InProgressTableHeader,
  },
  {
    id: 4,
    title: 'Completed',
    key: 'completed',
    header: CompletedTableHeader,
  },
  // {
  //   id: 5,
  //   title: 'Paid',
  //   key: 'paid',
  //   header: PaidTableHeader,
  // },
];

export const PrimitivePendingTableHeader = [
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
    title: 'VAN Number',
    key: 'plate',
    level2: {
      key: 'vehicle',
    },
    type: 'string',
  },
  {
    title: 'Van Type',
    key: 'van-type',
    type: 'string',
  },
  {
    title: 'Action',
    key: 'action',
    type: 'button',
    text: 'Send Schedule',
    func: 'onClickButton',
    disableState: {
      key: 'quotations',
      isDisable: (data: any) =>
        data.quotations.find(
          (quotation: any, index: number) => quotation.vendor_account_id !== data.vender_id
        ),
    },
  },
];

export const PrimitiveCompleteTableHeader = [
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
    title: 'VAN Number',
    key: 'plate',
    level2: {
      key: 'vehicle',
    },
    type: 'string',
  },
  {
    title: 'Van Type',
    key: 'van-type',
    type: 'string',
  },
  {
    title: 'Action',
    key: 'action',
    type: 'button',
    text: 'View',
    func: 'onClickButton',
  },
];

export const PrimitiveTabMenus = [
  {
    id: 0,
    title: 'Pending',
    key: 'pending',
    header: PrimitivePendingTableHeader,
  },
  {
    id: 1,
    title: 'Completed',
    key: 'completed',
    header: PrimitiveCompleteTableHeader,
  },
  {
    id: 2,
    title: 'Paid',
    key: 'paid',
    header: PrimitiveCompleteTableHeader,
  },
];

export const dashboardPages = [
  {
    name: 'Repair Requests',
    pageTitle: 'Repair Requests',
    code: 'RP',
  },
  {
    name: 'Preventive Maintenance',
    pageTitle: 'Preventive',
    code: 'PM',
  },
];

export const dashboardFilterTwo = [
  {
    name: 'Onsite',
    code: 'ON',
  },
];
