import { format } from 'date-fns';

const zeros = '00';

export const formateDates = (date: Date) => {
  const newDate = new Date(date);
  return format(newDate, 'yyyy-MM-dd');
};

export const formateTIme = (date: Date) => {
  const newDate = new Date(date);
  return format(newDate, 'HH:mm:ss');
};
