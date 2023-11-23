import { FC, useContext, useMemo } from 'react';
import { DateCellProps } from './types';
import { Cell } from './styled';
import { FlexRow } from 'react-ui-expert';
import { Typography } from '@mui/material';
import { weekDaysNamesShort } from '../../../utils/week';
import { CalendarContext } from '../../../context/CalendatContext/Provider';
import moment from 'moment';

export const DateCell: FC<DateCellProps> = ({ date }) => {
  const { dateDetails } = useContext(CalendarContext)!;

  const weekDay = useMemo(() => weekDaysNamesShort[date.weekday()], [date]);
  const isToday = useMemo(() => date.isSame(moment(), 'day'), [date]);
  const isWeekend = useMemo(
    () => weekDaysNamesShort.slice(-2).includes(weekDay),
    [weekDay]
  );
  const isPrevMonthDay = useMemo(
    () => date.month() !== dateDetails.m,
    [date, dateDetails.m]
  );

  return (
    <Cell disabled={isPrevMonthDay} isToday={isToday}>
      <FlexRow width='100%' alignItems='center' justifyContent='space-between'>
        <Typography
          variant='caption'
          sx={{
            fontWeight: 700,
            color: isWeekend ? 'orangered' : 'inherit',
          }}>
          {weekDay}
        </Typography>
        <Typography variant='button'>{date.format('DD.MM.YYYY')}</Typography>
      </FlexRow>
    </Cell>
  );
};
