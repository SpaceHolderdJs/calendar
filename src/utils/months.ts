import moment, { Moment } from "moment";

export const months = moment.months();

export const monthsObject = months.reduce<Record<string, string>>((acc, m) => {
  acc[m] = m;
  return acc;
}, {});

export type MonthsType = keyof typeof monthsObject;

export const getMonthDays = (momentInstance: Moment) => {
  const year = momentInstance.year();
  const month = momentInstance.month();

  const startDate = moment([year, month]);

  const daysInMonth = startDate.daysInMonth();

  // Create an array to hold all the dates of the month
  const monthDatesArray = [];

  // Loop through each day of the month and add it to the array
  for (let day = 0; day < daysInMonth; day++) {
    const date = startDate.clone().add(day, "days");
    monthDatesArray.push(date);
  }

  return monthDatesArray;
};

export const getMonthDaysWithOffsets = (momentInstance: Moment) => {
  const firstDayOfMonth = momentInstance.clone().set("date", 1);
  const weekDay = firstDayOfMonth.weekday();

  console.log(weekDay, "weekDay");

  const prevMonthDays =
    weekDay <= 1
      ? []
      : getMonthDays(momentInstance.clone().subtract(1, "month")).slice(
          -weekDay + 1
        );

  return [
    ...prevMonthDays,
    ...getMonthDays(momentInstance),
    // ...getMonthDays(momentInstance.clone().add(1, "month")),
  ];
};
