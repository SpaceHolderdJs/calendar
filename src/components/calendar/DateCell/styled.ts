import { styled } from "@mui/material";
import { theme } from "../../../theme";

export const Cell = styled("div")<{ disabled?: boolean; isToday?: boolean }>`
  border-radius: 4px;
  padding: 10px;
  box-sizing: content-box;
  border: 1px solid rgba(225, 229, 237, 0.1);
  background: #2b2b2c;
  min-height: 10vh;
  max-height: 15vh;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  ${({ isToday }) =>
    isToday ? `background: ${theme.palette.primary.dark};` : ""}

  ${({ disabled }) =>
    disabled
      ? `
    opacity: 0.3;
  `
      : ""}

  :hover {
    background: #3b3b3c;
  }
`;
