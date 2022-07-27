const zeros = '00';

export const formateDates = (date: Date) => {
  const day = date.getDate().toString();
  const month = date.getMonth().toString();
  const year = date.getFullYear().toString();

  return `${year}-${zeros.slice(month.length)}${month}-${zeros.slice(day.length)}${day}`;
};

export const formateTIme = (date: Date) => {
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const seconds = date.getSeconds().toString();

  return `${zeros.slice(hours.length)}${hours}:${zeros.slice(
    minutes.length
  )}${minutes}:${zeros.slice(seconds.length)}${seconds}`;
};
