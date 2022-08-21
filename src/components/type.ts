export interface IDateTimeSlotFields {
  date: Date | undefined;
  time: Date | undefined;
}

export interface IVideoModal {
  url: string;
  show: boolean;
  setShow: (value: boolean) => void;
}

export interface IImageModal {
  src: string;
  show: boolean;
  setShow: (value: boolean) => void;
}
