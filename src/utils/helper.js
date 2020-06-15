export const formatDateToString = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${formatDateNumber(day)}${formatDateNumber(month)}${formatDateNumber(
    year
  )}`;
};

export const formatDateNumber = (num) => (num > 9 ? String(num) : `0${num}`);
