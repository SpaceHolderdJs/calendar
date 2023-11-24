import { FlexColumn } from "react-ui-expert";
import { CalendarBody, CalendarHeader } from "./styled";
import { Button, ButtonGroup } from "@mui/material";
import { useContext, useMemo } from "react";
import { getMonthDaysWithOffsets } from "../../../utils/months";
import { DateCell } from "../DateCell";
import { MonthToggler } from "../MonthToggler";
import { CalendarContext } from "../../../context/CalendatContext/Provider";
import { Moment } from "moment";
import { useKeyEvent } from "../../../hooks/useKeyEvent";
import { TransitionsModal } from "../Modal";
import { CreateEvent } from "../CreateEvent/CreateEvent";

export const Wrapper = () => {
  const { currentDate } = useContext(CalendarContext)!;

  useKeyEvent("metaKey", () => {});

  const monthDays = useMemo(
    () => getMonthDaysWithOffsets(currentDate),
    [currentDate]
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
              <FlexColumn width="100%" background="#212121">
                <CreateEvent />
              </FlexColumn>
            }
          />
        </ButtonGroup>
        {currentDate.year()}
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
