import moment from "moment";

export const months = moment.months();

export const monthsObject = months.reduce<Record<string, string>>((acc, m) => {
  acc[m] = m;
  return acc;
}, {});

export type MonthsType = keyof typeof monthsObject;

const generateNextMonthDays = (
  month: number,
  year: number,
  missingLength: number
) => {
  const m = month;
  const y = year;

  const daysInMonth = moment(`${y}-${m}`, "YYYY-MM").daysInMonth();

  // const endMonthDayOffset = moment(
  //   `${year}-${month}-${daysInMonth}`,
  //   "YYYY-MM"
  // ).day();

  const monthDatesArray = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = moment(
      `${year}-${month - 1 > 0 ? month - 1 : 12}-${day}`,
      "YYYY-MM-DD"
    );
    monthDatesArray.push(date);
  }

  return monthDatesArray.slice(0, missingLength);
};

const generatePrevMonthDays = (month: number, year: number) => {
  const startMonthDayOffset = moment(`${year}-${month}`, "YYYY-MM").day();

  const daysInMonth = moment(
    `${year}-${month - 1 > 0 ? month - 1 : 12}`,
    "YYYY-MM"
  ).daysInMonth();
  const monthDatesArray = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = moment(
      `${year}-${month - 1 > 0 ? month - 1 : 12}-${day}`,
      "YYYY-MM-DD"
    );
    monthDatesArray.push(date);
  }

  return startMonthDayOffset === 0
    ? []
    : monthDatesArray.slice(-startMonthDayOffset);
};

export const getMonthDays = (month: number, year: number) => {
  const daysInMonth = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
  const monthDatesArray = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = moment(`${year}-${month}-${day}`, "YYYY-MM-DD");
    monthDatesArray.push(date);
  }

  const prevMonthOffset = generatePrevMonthDays(month, year);

  const missingLength = 42 - (prevMonthOffset.length + monthDatesArray.length);

  const nextMonthOffset = generateNextMonthDays(month, year, missingLength);

  return [...prevMonthOffset, ...monthDatesArray, ...nextMonthOffset];
  //   .filter(
  //     (d, i, arr) =>
  //       i ===
  //       arr.findIndex((dt) => dt.format("DD-MM-YYYY") === d.format("DD-MM-YYYY"))
  //   );
};
