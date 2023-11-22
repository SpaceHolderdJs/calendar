import { FlexColumn } from "react-ui-expert";
import { CalendarBody, CalendarHeader } from "./styled";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { useContext, useMemo } from "react";
import { getMonthDays } from "../../../utils/months";
import { DateCell } from "../DateCell";
import { MonthToggler } from "../MonthToggler";
import { CalendarContext } from "../../../context/CalendatContext/Provider";
import { Moment } from "moment";
import { useKeyEvent } from "../../../hooks/useKeyEvent";
import { TransitionsModal } from "../Modal";

export const Wrapper = () => {
  const { dateDetails } = useContext(CalendarContext)!;

  useKeyEvent("metaKey", () => {});

  const monthDays = useMemo(
    () => getMonthDays(dateDetails.m + 1, dateDetails.y),
    [dateDetails.m, dateDetails.y]
  );

  return (
    <FlexColumn width="100%" alignItems="center" height="90vh">
      <CalendarHeader>
        <ButtonGroup>
          <TransitionsModal
            button={
              <Button variant="contained" sx={{ clipPath: "circle(35%)" }}>
                +
              </Button>
            }
            children={
              <FlexColumn width="100%">
                <Typography>Create event</Typography>
              </FlexColumn>
            }
          />
        </ButtonGroup>
        {dateDetails.y}
        <MonthToggler />
      </CalendarHeader>
      <CalendarBody>
        {monthDays.map((d: Moment) => (
          <DateCell key={d.format("DD-MM-YYYY")} date={d} />
        ))}
      </CalendarBody>
    </FlexColumn>
  );
};