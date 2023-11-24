import { styled } from "@mui/material";

export const CalendarBody = styled("div")`
  width: 100%;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(6rem, 12rem));
  grid-template-rows: repeat(auto, 300px);
  gap: 5px;
  height: 80%;
`;

export const CalendarHeader = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(7 * 12rem);
  height: 20%;
`;
