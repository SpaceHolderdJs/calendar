import moment from "moment";

export const weekDaysNames = [
  ...moment.weekdays().slice(1),
  moment.weekdays()[0],
];

export const weekDaysNamesShort = weekDaysNames.map((e) =>
  e.toUpperCase().slice(0, 2)
);
