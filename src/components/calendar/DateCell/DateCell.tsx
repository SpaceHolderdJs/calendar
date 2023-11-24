import { FC, useContext, useMemo } from "react";
import { DateCellProps } from "./types";
import { Cell } from "./styled";
import { FlexColumn, FlexRow } from "react-ui-expert";
import { Typography } from "@mui/material";
import { weekDaysNamesShort } from "../../../utils/week";
import { CalendarContext } from "../../../context/CalendatContext/Provider";
import moment from "moment";
import { Close } from "@mui/icons-material";
import { TransitionsModal } from "../Modal";
import { CreateEvent } from "../CreateEvent/CreateEvent";

export const DateCell: FC<DateCellProps> = ({ date }) => {
  const { currentDate, cellsData, actions } = useContext(CalendarContext)!;

  const weekDay = useMemo(
    () => date.format("dddd").slice(0, 2).toUpperCase(),
    [date]
  );
  const isToday = useMemo(() => date.isSame(moment(), "day"), [date]);
  const isWeekend = useMemo(
    () => weekDaysNamesShort.slice(-2).includes(weekDay),
    [weekDay]
  );
  const isPrevMonthDay = useMemo(
    () => date.month() !== currentDate.month(),
    [date, currentDate]
  );

  const events = useMemo(
    () => cellsData[date.format(`YYYY-MM-DD`)],
    [cellsData, date]
  );

  return (
    <Cell disabled={isPrevMonthDay} isToday={isToday}>
      <FlexRow
        width="100%"
        height="20%"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap">
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: isWeekend ? "orangered" : "inherit",
          }}>
          {weekDay}
        </Typography>
        <Typography variant="button">{date.format("DD.MM.YYYY")}</Typography>
      </FlexRow>

      <FlexColumn
        width="100%"
        height="80%"
        overflowY="auto"
        gap="5px"
        marginTop="10px">
        {events?.map(({ title, time, date }, i, arr) => (
          <TransitionsModal
            button={
              <FlexRow
                width="100%"
                alignItems="center"
                gap="20px"
                background="black"
                borderRadius="4px"
                boxSizing="border-box"
                justifyContent="space-between"
                padding="0 10px">
                <FlexRow gap="10px">
                  {time && (
                    <Typography margin="0" variant="caption">
                      {time}
                    </Typography>
                  )}
                  <Typography margin="0" variant="caption">
                    {title}
                  </Typography>
                </FlexRow>
                <Close
                  sx={{ transform: "scale(0.8) translateX(10px)" }}
                  onClick={() =>
                    actions?.removeEvent(date.format(`YYYY-MM-DD`), arr[i])
                  }
                />
              </FlexRow>
            }
            children={<CreateEvent eventToDisplay={arr[i]} />}
          />
        ))}
      </FlexColumn>
    </Cell>
  );
};
