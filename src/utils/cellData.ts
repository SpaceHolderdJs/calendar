import moment, { Moment } from "moment";

export const generateCellsDataForYear = (momentInstance: Moment) => {
  const cellsData: Record<string, []> = {};
  const momentCopy = moment(momentInstance);

  moment.monthsShort().forEach((m: string) => {
    momentCopy.set("month", +m);
  });

  return cellsData;
};
