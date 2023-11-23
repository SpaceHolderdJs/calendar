import moment from 'moment';

export const generateCellsDataForYear = (year: string | number) => {
  const momentDate = moment().set('date', 1).set('month', 1).set('year', +year);

  const cellsData: Record<string, []> = {};

  moment.monthsShort().forEach((m: string) => {
    momentDate.set('month', +m);

    // console.log(momentDate.get("DDD"), "DAYS");
  });

  return cellsData;
};
