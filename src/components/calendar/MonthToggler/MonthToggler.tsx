import { ChangeEventHandler, useCallback, useContext, useMemo } from "react";
import { Button, Typography } from "@mui/material";
import moment from "moment";
import { FlexRow, Input } from "react-ui-expert";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CalendarContext } from "../../../context/CalendatContext/Provider";

export const MonthToggler = () => {
  const { currentDate, actions } = useContext(CalendarContext)!;

  const currentMonthName = useMemo(
    () => moment.months()[currentDate.month()],
    [currentDate]
  );

  const onPrevButtonClick = useCallback(() => {
    const date = currentDate.subtract(1, "month").clone();

    actions?.setCurrentDate(date);
  }, [actions, currentDate]);

  const onNextButtonClick = useCallback(() => {
    const date = currentDate.add(1, "month").clone();

    actions!.setCurrentDate(date);
  }, [actions, currentDate]);

  const changeDatePicker = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const momentValue = moment(event.target.value, "YYYY-MM-DD");
      actions!.setCurrentDate(momentValue);
    },
    [actions]
  );

  return (
    <FlexRow alignItems="center" justifyContent="center">
      <Button startIcon={<ArrowBackIosIcon />} onClick={onPrevButtonClick} />
      <Typography variant="h5" sx={{ width: "10rem", textAlign: "center" }}>
        {currentMonthName}
      </Typography>
      <Button
        startIcon={<ArrowForwardIosIcon />}
        onClick={onNextButtonClick}
        id="abc"
      />
      <Input
        type="date"
        value={currentDate.format(`YYYY-MM-DD`)}
        onChange={changeDatePicker}
      />
    </FlexRow>
  );
};
