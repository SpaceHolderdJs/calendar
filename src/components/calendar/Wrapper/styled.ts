import { styled } from '@mui/material';

export const CalendarBody = styled('div')`
  display: grid;
  grid-template-columns: repeat(7, 12rem);
  gap: 5px;
  height: 80%;
`;

export const CalendarHeader = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(7 * 12rem);
  height: 20%;
`;
