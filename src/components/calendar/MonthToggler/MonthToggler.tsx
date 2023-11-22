import { ChangeEventHandler, useCallback, useContext, useMemo } from "react";
import { Button, Typography } from "@mui/material";
import moment from "moment";
import { FlexRow, Input } from "react-ui-expert";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CalendarContext } from "../../../context/CalendatContext/Provider";

export const MonthToggler = () => {
  const { dateDetails, actions } = useContext(CalendarContext)!;
  const { m, y, d } = dateDetails;

  const currentMonthName = useMemo(() => moment.months()[m], [m]);

  const onPrevButtonClick = useCallback(() => {
    const newMonthNumber = m - 1;

    if (newMonthNumber <= 0) {
      actions?.setCurrentYear(y - 1);
      actions?.setCurrentMonth(11);
    } else {
      actions?.setCurrentMonth(newMonthNumber);
    }
  }, [actions, m, y]);

  const onNextButtonClick = useCallback(() => {
    const newMonthNumber = m + 1;

    if (newMonthNumber >= 12) {
      actions?.setCurrentYear(y + 1);
      actions?.setCurrentMonth(0);
    } else {
      actions?.setCurrentMonth(newMonthNumber);
    }
  }, [actions, m, y]);

  const changeDatePicker = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const momentValue = moment(event.target.value, "YYYY-MM-DD");
      actions?.setDateDetails({
        d: momentValue.day(),
        m: momentValue.month(),
        y: momentValue.year(),
      });
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
        value={moment(`${y}-${m + 1}-${d}`, `YYYY-MM-DD`).format(`YYYY-MM-DD`)}
        onChange={changeDatePicker}
      />
    </FlexRow>
  );
};
